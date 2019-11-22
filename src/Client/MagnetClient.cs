using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using Grpc.Net.Client;
using Magnet.Client.Mappers;

namespace Magnet.Client
{

    public class MagnetClient
    {
        private readonly IMessageBus _messageBus;
        private readonly MessageMapperFactory _messageMapper;
        private readonly MagnetOptions _options;
        private readonly List<MagnetMessage> _messages = new List<MagnetMessage>();
        private readonly List<Action<MagnetMessage>> _waitHandlers =
            new List<Action<MagnetMessage>>();

        private bool _isListening = false;

        public MagnetClient(
            IMessageBus messageBus,
            MessageMapperFactory messageMapper,
            MagnetOptions options)
        {
            _messageBus = messageBus;
            _messageMapper = messageMapper;
            _options = options;


        }

        private async Task EnsureListening()
        {
            if (!_isListening)
                await StartListening();
        }

        private async Task StartListening()
        {

            var channel = GrpcChannel.ForAddress("https://localhost:5001");
            var client = new Magnet.Protos.Messenger.MessengerClient(channel);

            AsyncServerStreamingCall<Protos.MagnetMessage> messages =
                client.GetMessages(new Protos.MessagesRequest { ClientName = "all" });
                

            try
            {
                await foreach (Protos.MagnetMessage msg in messages.ResponseStream.ReadAllAsync())
                {
                    Console.Write(msg.Type);
                }
            }
            catch (Exception ex)
            {
                var a = ex;
            }

            //_messageBus.RegisterMessageHandler(_options.ClientName, (message, token) =>
            //{
            //    _messages.Add(message);
            //    foreach (Action<MagnetMessage> handler in _waitHandlers)
            //    {
            //        handler(message);
            //    }
            //    return Task.CompletedTask;
            //});
            _isListening = true;
        }


        private async Task RegisterWait(Action<MagnetMessage> handler, WaitFilter filter = null)
        {
            await EnsureListening();
            _waitHandlers.Add(handler);
        }

        public async Task<TMessage> WaitFor<TMessage>(WaitFilter waitFilter = null, WaitOptions options = null)
        {
            //waitFilter.Predicate()

            CancellationToken timeoutToken =
                new CancellationTokenSource(TimeSpan.FromSeconds(60)).Token;
            var completion = new TaskCompletionSource<TMessage>();
            timeoutToken.Register(() => completion.SetCanceled());

            await RegisterWait((message) =>
            {
                try
                {
                    TMessage mapped = _messageMapper.Map<TMessage>(message);
                    completion.SetResult(mapped);
                }
                catch (Exception ex)
                {
                    completion.SetException(ex);
                }
            });

            return await completion.Task;
        }
    }
}
