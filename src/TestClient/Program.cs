using System;
using System.Threading.Tasks;
using Grpc.Core;
using Grpc.Net.Client;

namespace TestClient
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var subsc = "all";

            if (args.Length > 0)
                subsc = args[0];

            // The port number(5001) must match the port of the gRPC server.
            using var channel = GrpcChannel.ForAddress("https://localhost:5001");
            var client = new Magnet.Protos.Messenger.MessengerClient(channel);

            AsyncServerStreamingCall<Magnet.Protos.MagnetMessage> messages =
                client.GetMessages(new Magnet.Protos.MessagesRequest { ClientName = subsc });

            Console.WriteLine("Connected, waiting for messages");

            await foreach (Magnet.Protos.MagnetMessage msg in messages.ResponseStream.ReadAllAsync())
            {
                Console.WriteLine($"{msg.Type}-{msg.From}");
            }

            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
            Console.WriteLine("Disconecting...");
        }
    }
}
