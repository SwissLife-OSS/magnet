using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Grpc.Core;
using Grpc.Net.Client;
using Magnet;
using Magnet.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace TestClient
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var subsc = "a";

            if (args.Length > 0)
                subsc = args[0];

            //var client = new MessageStreamClient(new GrpcOptions
            //{
            //    Address = "https://localhost:5001"
            //});


            //client.RegisterMessageReceivedHandler("a", (msg) =>
            //{
            //    Console.WriteLine(msg.From);
            //});

            IServiceProvider services = BuildServiceProvider();
            MagnetClient mg = services.GetService<MagnetClient>();

            while (true)
            {
                SmsMessage sms = await mg.WaitForSms("+41798074288");
                //SmsMessage sms = await mg.WaitFor<SmsMessage>(
                //    FilterBuilder.To("sasas")
                //    .Build());
                Console.WriteLine(sms.From);
            }

            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
            Console.WriteLine("Disconecting...");
        }



        private static IServiceProvider BuildServiceProvider()
        {
            IServiceCollection services = new ServiceCollection();
            services.AddSingleton<IMessageStreamClient, MessageStreamClient>();
            services.AddMagnet(null);

            services.AddSingleton(
                new MagnetOptions
                {
                    ClientName = "a",
                    Grpc = new GrpcOptions
                    {
                        Address = "https://localhost:5001"
                    }
                }
                );

            services.AddSingleton(c => c.GetService<MagnetOptions>().Grpc);
            return services.BuildServiceProvider();
        }

    }
}
