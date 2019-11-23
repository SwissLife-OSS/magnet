using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Grpc.Net.Client;

namespace Magnet.Client
{
    public class GrpcMessageStreamClient : IMessageStreamClient
    {
        private readonly GrpcOptions _grpcOptions;
        private readonly GrpcChannel _channel;
        Action<MagnetMessage> _handler = null;

        public GrpcMessageStreamClient(GrpcOptions grpcOptions)
        {
            _grpcOptions = grpcOptions;
            _channel = GrpcChannel.ForAddress(_grpcOptions.Address);
        }

        private async Task GetMessagesAsync(string clientName)
        {
            
            var client = new Magnet.Protos.Messenger.MessengerClient(_channel);

            AsyncServerStreamingCall<Protos.MagnetMessage> messages =
                client.GetMessages(new Protos.MessagesRequest { ClientName = clientName });

            await foreach (Protos.MagnetMessage msg in messages.ResponseStream.ReadAllAsync())
            {
                _handler(ConvertToMagnetMessage(msg));
            }
        }

        public async Task AddReadReceiptAsync(MessageReceivedReceipt readReceipt)
        {
            var client = new Magnet.Protos.Messenger.MessengerClient(_channel);
            await client.AddReadReceiptAsync(new Protos.ReceivedReceipt
            {
                ClientName = readReceipt.ClientName,
                MessageId = readReceipt.MessageId.ToString("N"),
                ReceivedAt = Timestamp.FromDateTime(readReceipt.ReceivedAt),
                IsMatch = readReceipt.IsMatch
            });
        }


        public Task RegisterMessageReceivedHandler(string clientName, Action<MagnetMessage> handler)
        {
            _handler = handler;
            GetMessagesAsync(clientName);
            return Task.CompletedTask;
        }

        private MagnetMessage ConvertToMagnetMessage(Protos.MagnetMessage proto)
        {
            var props = new Dictionary<string, object>();
            foreach (KeyValuePair<string, string> p in proto.Properties)
            {
                props.Add(p.Key, p.Value);
            }

            var msg = new MagnetMessage
            {
                Id = Guid.Parse(proto.Id),
                Type = proto.Type,
                Provider = proto.Provider,
                Body = proto.Body,
                From = proto.From,
                ReceivedAt = proto.ReceivedAt.ToDateTime(),
                Properties = props,
                To = new List<string>(proto.To.Select(x => x))
            };
            return msg;
        }

        public Task UnSubscribe(string clientName, string token)
        {
            throw new NotImplementedException();
        }

        public Task<MagnetMessage> GetNextAsync(string clientName, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
