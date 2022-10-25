using System;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Azure;
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
        _client = new ServiceBusClient(options.ConnectionString);
        _adminClient = new ServiceBusAdministrationClient(
            options.ConnectionString,
            new ServiceBusAdministrationClientOptions
            {
                Diagnostics = {IsDistributedTracingEnabled = true}
            });
    }

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
            MessageId = message.Id.ToString("N"),
            Subject = message.Type
        };

        return sbMessage;
    }

    public async Task<MagnetMessage> GetNextAsync(
        string name,
        CancellationToken cancellationToken)
    {
        ServiceBusReceiver receiver = _client.CreateReceiver(
            name,
            new ServiceBusReceiverOptions
            {
                PrefetchCount = 1,
                ReceiveMode = ServiceBusReceiveMode.PeekLock
            });

        ServiceBusReceivedMessage message = default;
        try
        {
            message = await receiver
                .ReceiveMessageAsync(cancellationToken: cancellationToken);

            MagnetMessage magnetMsg = JsonSerializer
                .Deserialize<MagnetMessage>(message.Body.ToString());

            await receiver.CompleteMessageAsync(message, cancellationToken);

            return magnetMsg;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Cannot get next message");
            if (message is not null)
            {
                await receiver.AbandonMessageAsync(message, cancellationToken: cancellationToken);
            }
            throw;
        }
        finally
        {
            await receiver.CloseAsync(cancellationToken);
            await receiver.DisposeAsync();
        }
    }

    public async Task RegisterMessageHandler(
        string name,
        Func<MagnetMessage, CancellationToken, Task> handler,
        CancellationToken cancellationToken)
    {
        await SubscribeAsync(name, cancellationToken);

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
            _logger.LogError(args.Exception, "Cannot receive message on the registered handler");

            return Task.CompletedTask;
        };

        await processor.StartProcessingAsync(cancellationToken);
    }

    public async Task<string> SubscribeAsync(string name, CancellationToken cancellationToken)
    {
        var options = new CreateSubscriptionOptions(_options.Topic, name)
        {
            AutoDeleteOnIdle = TimeSpan.FromMinutes(10),
            RequiresSession = false
        };

        try
        {
            bool exists = await _adminClient
                .SubscriptionExistsAsync(_options.Topic, name, cancellationToken);

            if (!exists)
            {
                SubscriptionProperties properties = await _adminClient
                    .CreateSubscriptionAsync(options, cancellationToken);

                return properties.SubscriptionName;
            }

            return name;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Cannot create subscription");
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
