using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using Magnet.Protos;
using Microsoft.Extensions.Logging;

namespace Magnet.Grpc
{
    public class MessageStreamService : Messenger.MessengerBase, IDisposable
    {
        private readonly ILogger<MessageStreamService> _logger;
        private readonly IMessageBus _messageBus;

        public MessageStreamService(ILogger<MessageStreamService> logger, IMessageBus messageBus)
        {
            _logger = logger;
            _messageBus = messageBus;
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
                        Type = msg.Type,
                        From = msg.From,
                        Body = msg.Body,
                        Provider = msg.Provider,
                        ReceivedAt = Google.Protobuf.WellKnownTypes.Timestamp.FromDateTime(msg.ReceivedAt),
                    };

                    foreach (KeyValuePair<string, object> p in msg.Properties)
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
                _messageBus.Dispose();
            }
        }
    }
}
