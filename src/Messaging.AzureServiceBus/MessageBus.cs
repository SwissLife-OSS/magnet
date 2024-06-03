using System;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Azure.Identity;
using Azure.Messaging.ServiceBus;
using Azure.Messaging.ServiceBus.Administration;
using Microsoft.Extensions.Logging;

namespace Magnet.Messaging.AzureServiceBus;

public sealed class MessageBus : IMessageBus
{
    private readonly AzureServiceBusOptions _options;
    private readonly ILogger<MessageBus> _logger;
    private readonly ServiceBusClient _client;
    private readonly ServiceBusAdministrationClient _adminClient;

    public MessageBus(AzureServiceBusOptions options, ILogger<MessageBus> logger)
    {
        _options = options;
        _logger = logger;
        _client = GetServiceBusClient(options);
        _adminClient = GetServiceBusAdministrationClient(options);
    }

    private ServiceBusClient GetServiceBusClient(AzureServiceBusOptions options) => options switch
    {
        { ConnectionString: { } connectionString } when !string.IsNullOrEmpty(connectionString) =>
            new ServiceBusClient(connectionString),
        { Url: { } url } when !string.IsNullOrEmpty(url) =>
            new ServiceBusClient(
                url,
                new WorkloadIdentityCredential(),
                new ServiceBusClientOptions { TransportType = ServiceBusTransportType.AmqpWebSockets }),
        _ => throw new ArgumentException(
            "ConnectionString or Url is required for Azure Service Bus.")
    };

    private ServiceBusAdministrationClient GetServiceBusAdministrationClient(
        AzureServiceBusOptions options) => options switch
    {
        { ConnectionString: { } connectionString } when !string.IsNullOrEmpty(connectionString) =>
            new ServiceBusAdministrationClient(
                connectionString,
                new ServiceBusAdministrationClientOptions { Diagnostics = { IsDistributedTracingEnabled = true } }),
        { Url: { } url } when !string.IsNullOrEmpty(url) =>
            new ServiceBusAdministrationClient(
                url,
                new WorkloadIdentityCredential(),
                new ServiceBusAdministrationClientOptions { Diagnostics = { IsDistributedTracingEnabled = true } }),
        _ => throw new ArgumentException(
            "ConnectionString or Url is required for Azure Service Bus.")
    };

    public async Task<string> PublishAsync(MagnetMessage message)
    {
        ServiceBusSender sender = _client.CreateSender(_options.Topic);
        ServiceBusMessage sbMessage = CreateMessage(message);

        await sender.SendMessageAsync(sbMessage);

        return sbMessage.MessageId;
    }

    private static ServiceBusMessage CreateMessage(MagnetMessage message)
    {
        var jsonMessage = JsonSerializer.Serialize(message);
        var sbMessage = new ServiceBusMessage(jsonMessage)
        {
            MessageId = message.Id.ToString("N"), Subject = message.Type
        };

        return sbMessage;
    }

    public async Task<MagnetMessage> GetNextAsync(
        string name,
        CancellationToken cancellationToken)
    {
        _logger.BeginReadNextMessage(name);

        await using ServiceBusReceiver receiver = _client.CreateReceiver(
            _options.Topic,
            name,
            new ServiceBusReceiverOptions { PrefetchCount = 1, ReceiveMode = ServiceBusReceiveMode.PeekLock, });

        ServiceBusReceivedMessage message = default;
        try
        {
            message = await receiver
                .ReceiveMessageAsync(_options.ReceiveTimeout, cancellationToken);

            MagnetMessage magnetMsg = JsonSerializer
                .Deserialize<MagnetMessage>(message.Body.ToString());

            _logger.EndReadNextMessage(magnetMsg.Id, name);

            await receiver.CompleteMessageAsync(message, cancellationToken);

            return magnetMsg;
        }
        catch (Exception ex)
        {
            _logger.FailedReadMessage(ex, name);
            if (message is not null)
            {
                await receiver.AbandonMessageAsync(message, cancellationToken: cancellationToken);
            }

            throw;
        }
    }

    public async Task RegisterMessageHandler(
        string name,
        Func<MagnetMessage, CancellationToken, Task> handler,
        CancellationToken cancellationToken)
    {
        ServiceBusProcessor processor = _client.CreateProcessor(
            _options.Topic,
            name,
            new ServiceBusProcessorOptions
            {
                PrefetchCount = 1,
                ReceiveMode = ServiceBusReceiveMode.PeekLock,
                MaxConcurrentCalls = 1,
                AutoCompleteMessages = false,
                MaxAutoLockRenewalDuration = TimeSpan.FromHours(1),
            });

        processor.ProcessMessageAsync += async args =>
        {
            MagnetMessage magnetMsg = JsonSerializer
                .Deserialize<MagnetMessage>(args.Message.Body.ToString());

            await handler(magnetMsg, args.CancellationToken);

            await args.CompleteMessageAsync(args.Message, args.CancellationToken);
        };

        processor.ProcessErrorAsync += args =>
        {
            _logger.FailedReceivingMessage(args.Exception, name);

            return Task.CompletedTask;
        };

        await processor.StartProcessingAsync(cancellationToken);
    }

    public async Task<string> SubscribeAsync(
        string name,
        CancellationToken cancellationToken)
    {
        try
        {
            var options = new CreateSubscriptionOptions(
                _options.Topic,
                SubscriptionName.Create(name)) { AutoDeleteOnIdle = TimeSpan.FromHours(1), RequiresSession = false };

            SubscriptionProperties properties = await _adminClient
                .CreateSubscriptionAsync(options, cancellationToken);

            return properties.SubscriptionName;
        }
        catch (Exception ex)
        {
            _logger.FailedCreatingSubscription(ex, name);
            throw;
        }
    }

    public async Task UnSubscribeAsync(string name, CancellationToken cancellationToken)
    {
        await _adminClient.DeleteSubscriptionAsync(_options.Topic, name, cancellationToken);
    }

    public async ValueTask DisposeAsync()
    {
        await _client.DisposeAsync();
    }
}
