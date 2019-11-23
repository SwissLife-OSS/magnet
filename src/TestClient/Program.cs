using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Grpc.Core;
using Grpc.Net.Client;
using Magnet;
using Magnet.Client;
using Microsoft.AspNetCore.SignalR.Client;
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
            services.AddMagnet("a")
                        .UseHttp("http://localhost:5000");
                        //.UseGrpc("https://localhost:5001")
                        //.UseSignalR("http://localhost:5000");
            return services.BuildServiceProvider();
        }
    }
}
