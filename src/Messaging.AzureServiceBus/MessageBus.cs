using Magnet;
using Microsoft.Azure.ServiceBus;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Magnet.Messaging.AzureServiceBus
{
    public class MessageBus : IMessageBus
    {
        private readonly AzureServiceBusOptions _options;
        private ITopicClient _topicClient;
        private List<ISubscriptionClient> _subscriptions = new List<ISubscriptionClient>();

        public MessageBus(AzureServiceBusOptions options)
        {
            _options = options;
            _topicClient = new TopicClient(options.ConnectionString, options.Topic);
        }

        public async Task<string> PublishAsync(MagnetMessage message)
        {
            Message msg = CreateMessage(message);
            await _topicClient.SendAsync(msg);
            return msg.MessageId;
        }

        private static Message CreateMessage(MagnetMessage message)
        {
            var jsonMessage = JsonConvert.SerializeObject(message);
            var body = Encoding.UTF8.GetBytes(jsonMessage);

            var sbMessage = new Message
            {
                MessageId = message.Id.ToString("N"),
                Body = body,
                Label = message.Type
            };
            return sbMessage;
        }


        public async Task<MagnetMessage> GetNextAsync(string name, CancellationToken cancellationToken)
        {
            var client = new SubscriptionClient(_options.ConnectionString, _options.Topic, name);
            var completion = new TaskCompletionSource<MagnetMessage>();
            cancellationToken.Register(() => completion.SetCanceled());

            try
            {
                client.RegisterMessageHandler(async (message, token) =>
                {
                    string json = Encoding.UTF8.GetString(message.Body);
                    MagnetMessage magnetMsg = JsonConvert.DeserializeObject<MagnetMessage>(json);
                    await client.CompleteAsync(message.SystemProperties.LockToken);
                    await client.CloseAsync();
                    completion.SetResult(magnetMsg);
                },
                new MessageHandlerOptions(ExceptionReceivedHandler)
                { MaxConcurrentCalls = 1, AutoComplete = false });
            }
            catch ( Exception ex)
            {
                completion.SetException(ex);
            }
            return await completion.Task;
        }


        public void RegisterMessageHandler(
            string name,
            Func<MagnetMessage, CancellationToken, Task> handler)
        {
            var client = new SubscriptionClient(_options.ConnectionString, _options.Topic, name);
            client.RegisterMessageHandler(async (message, token) =>
            {
                string json = Encoding.UTF8.GetString(message.Body);
                MagnetMessage magnetMsg = JsonConvert.DeserializeObject<MagnetMessage>(json);
                await handler(magnetMsg, token);

                await client.CompleteAsync(message.SystemProperties.LockToken);
            },
            new MessageHandlerOptions(ExceptionReceivedHandler)
            { MaxConcurrentCalls = 1, AutoComplete = false });
        }

        private Task ExceptionReceivedHandler(
                ExceptionReceivedEventArgs exceptionReceivedEventArgs)
        {
            //Add tracing
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            _subscriptions.ForEach(s => s
                .CloseAsync()
                .GetAwaiter()
                .GetResult());
        }
    }
}
