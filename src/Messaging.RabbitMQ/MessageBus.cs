using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Polly;
using Polly.Retry;

namespace Magnet.Messaging.RabbitMQ
{
    public class MessageBus : IMessageBus
    {
        private readonly ConnectionFactory _connectionFactory;
        private readonly RabbitMQOptions _options;
        private static object _lock = new object();
        private bool _initialized = false;
        private IConnection _connection;

        public MessageBus(ConnectionFactory connectionFactory, RabbitMQOptions options)
        {
            _connectionFactory = connectionFactory;
            _options = options;
        }

        public async Task<MagnetMessage> GetNextAsyncWithLoop(
            string name,
            CancellationToken cancellationToken)
        {
            using IConnection connection = _connectionFactory.CreateConnection();
            using IModel channel = connection.CreateModel();

            channel.BasicQos(0, 1, false);

            int tryCount = 0;
            while (tryCount < 30)
            {
                tryCount++;
                BasicGetResult res = channel.BasicGet(name, false);
                if (res != null)
                {
                    MagnetMessage message = GetMessageFromBody(res.Body);

                    channel.BasicAck(res.DeliveryTag, false);
                    return message;
                }
                await Task.Delay(1000);
            }
            return null;
        }

        public async Task<MagnetMessage> GetNextAsync(string name, CancellationToken cancellationToken)
        {
            using IModel channel = GetChannel();

            var completion = new TaskCompletionSource<MagnetMessage>();
            cancellationToken.Register(() => completion.SetCanceled());
            try
            {
                channel.BasicQos(0, 1, false);
                var consumer = new EventingBasicConsumer(channel);

                EventHandler<BasicDeliverEventArgs> eventHandler = null;
                eventHandler =
                    delegate (object obj, BasicDeliverEventArgs ea)
                {
                    MagnetMessage msg = GetMessageFromBody(ea.Body);
                    completion.SetResult(msg);
                    consumer.Received -= eventHandler;
                };
                consumer.Received += eventHandler;
                string consumerTag = channel.BasicConsume(name, true, consumer);
            }
            catch (Exception ex)
            {
                completion.SetException(ex);
            }
            return await completion.Task;
        }


        public Task<string> SubscribeAsync(string name)
        {
            using IModel channel = GetChannel();
            var queueName = $"{name}-{Guid.NewGuid().ToString("N").Substring(6)}";
            PrepareQueue(channel, queueName);

            return Task.FromResult(queueName);
        }

        public Task UnSubscribeAsync(string name)
        {
            using IModel channel = GetChannel();
            channel.QueueDelete(name, ifUnused: false, ifEmpty: false);

            return Task.CompletedTask;
        }


        private static MagnetMessage GetMessageFromBody(byte[] body)
        {
            var json = Encoding.UTF8.GetString(body);
            MagnetMessage message = JsonConvert.DeserializeObject<MagnetMessage>(json);
            return message;
        }

        public Task<string> PublishAsync(MagnetMessage message)
        {
            using IModel channel = GetChannel();
            var body = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(message));
            channel.BasicPublish(exchange: _options.ExchangeName,
                                 routingKey: "",
                                 basicProperties: null,
                                 body: body);

            return Task.FromResult(message.Id.ToString("N"));
        }

        private void PrepareModel(IModel channel)
        {
            if (!_initialized)
            {
                lock (_lock)
                {
                    channel.ExchangeDeclare(
                        exchange: _options.ExchangeName,
                        type: ExchangeType.Fanout);
                    ProperaStoreQueue(channel);
                    _initialized = true;
                }
            }
        }


        private void ProperaStoreQueue(IModel channel)
        {
            string storeQueueName = "store";
            channel.QueueDeclare(storeQueueName, true, false, false, null);
            channel.QueueBind(queue: storeQueueName,
                  exchange: _options.ExchangeName,
                  routingKey: "");
        }

        private void PrepareQueue(IModel channel, string name)
        {
            var args = new Dictionary<string, object>();
            args.Add("x-message-ttl", _options.MessageTtl * 1000);
            channel.QueueDeclare(
                queue: name,
                durable: false,
                exclusive: false,
                autoDelete: false,
                args);

            channel.QueueBind(
                  queue: name,
                  exchange: _options.ExchangeName,
                  routingKey: "");
        }

        public void RegisterMessageHandler(
            string name,
            Func<MagnetMessage, CancellationToken, Task> handler)
        {
            IModel channel = GetChannel();
            var consumer = new EventingBasicConsumer(channel);
            consumer.Received += (model, ea) =>
            {
                MagnetMessage msg = GetMessageFromBody(ea.Body);
                handler(msg, default);
            };
            string consumerTag = channel.BasicConsume(name, true, consumer);
        }


        private IModel GetChannel()
        {
            RetryPolicy policy = Policy
                 .Handle<Exception>()
                 .WaitAndRetry(5, i => TimeSpan.FromSeconds(3));

            PolicyResult<IModel> result = policy.ExecuteAndCapture<IModel>(() =>
               {
                    if (_connection == null)
                    {
                        _connection = _connectionFactory.CreateConnection();
                    }
                    IModel channel = _connection.CreateModel();
                    PrepareModel(channel);
                    return channel;
               });

            return result.Result;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            _connection.Dispose();
        }
    }
}
