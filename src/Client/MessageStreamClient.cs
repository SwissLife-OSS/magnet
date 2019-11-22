using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Grpc.Core;
using Grpc.Net.Client;

namespace Magnet.Client
{
    public class MessageStreamClient : IMessageStreamClient
    {
        private readonly GrpcOptions _grpcOptions;
        Action<MagnetMessage> _handler = null;

        public MessageStreamClient(GrpcOptions grpcOptions)
        {
            _grpcOptions = grpcOptions;
        }

        private async Task GetMessagesAsync(string clientName)
        {
            var channel = GrpcChannel.ForAddress(_grpcOptions.Address);
            var client = new Magnet.Protos.Messenger.MessengerClient(channel);

            AsyncServerStreamingCall<Protos.MagnetMessage> messages =
                client.GetMessages(new Protos.MessagesRequest { ClientName = clientName });

            await foreach (Protos.MagnetMessage msg in messages.ResponseStream.ReadAllAsync())
            {
                _handler(ConvertToMagnetMessage(msg));
            }
        }

        public void RegisterMessageReceivedHandler(string clientName, Action<MagnetMessage> handler)
        {
            _handler = handler;
            GetMessagesAsync(clientName);
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
    }
}
