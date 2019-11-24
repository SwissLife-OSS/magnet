using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Magnet.Protos;
using Microsoft.Extensions.Logging;

namespace Magnet.Grpc
{
    public class MessageStreamService : Messenger.MessengerBase, IDisposable
    {
        private readonly ILogger<MessageStreamService> _logger;
        private readonly IMessageBus _messageBus;
        private readonly IMessageStore _messageStore;

        public MessageStreamService(
            ILogger<MessageStreamService> logger,
            IMessageBus messageBus,
            IMessageStore messageStore)
        {
            _logger = logger;
            _messageBus = messageBus;
            _messageStore = messageStore;
        }

        public async override Task<Empty> AddReadReceipt(ReceivedReceipt request, ServerCallContext context)
        {
            await _messageStore.AddReadReceiptAsync(
                new MessageReceivedReceipt
                {
                    MessageId = Guid.Parse(request.MessageId),
                    ClientName = request.ClientName,
                    ReceivedAt = request.ReceivedAt.ToDateTime(),
                    IsMatch = request.IsMatch
                },
                context.CancellationToken);
            ;
            return new Empty();
        }

        public override Task GetMessages(
            MessagesRequest request,
            IServerStreamWriter<Protos.MagnetMessage> responseStream,
            ServerCallContext context)
        {
            _logger.LogInformation($"GetMessages('{request.ClientName}')");

            _messageBus.RegisterMessageHandler(request.ClientName, async (msg, token) =>
            {
                _logger.LogInformation($"Message received. {msg.Type}");
                try
                {
                    var reply = new Protos.MagnetMessage
                    {
                        Id = msg.Id.ToString("N"),
                        Type = msg.Type,
                        From = msg.From,
                        Body = msg.Body,
                        Provider = msg.Provider,
                        ReceivedAt = Google.Protobuf.WellKnownTypes.Timestamp.FromDateTime(msg.ReceivedAt),
                    };

                    foreach (KeyValuePair<string, string> p in msg.Properties)
                    {
                        reply.Properties.Add(p.Key, p.Value.ToString());
                    }
                    foreach (var r in msg.To)
                    {
                        reply.To.Add(r);
                    }

                    await responseStream.WriteAsync(reply);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error in Handle message");
                }
            });

            var mres = new ManualResetEventSlim(false);
            while (true)
            {
                if (context.CancellationToken.IsCancellationRequested)
                {
                    Console.WriteLine("Canceled while running.");
                    break;
                }
                try
                {
                    mres.Wait(context.CancellationToken);
                }
                catch (OperationCanceledException)
                {
                    _messageBus.Dispose();
                    Console.WriteLine("The wait operation was canceled.");
                    break;
                }

                Thread.SpinWait(500000);
            }
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                //_messageBus.Dispose();
            }
        }
    }
}
