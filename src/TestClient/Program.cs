using System;
using System.Threading.Tasks;
using Magnet.Client;
using Microsoft.Extensions.DependencyInjection;

namespace TestClient
{
    class Program
    {
        static async Task Main(string[] args)
        {
            IServiceProvider services = BuildServiceProvider();
            MagnetClient mg = services.GetService<MagnetClient>();

            using (MessageReceiver receiver = await mg.StartAsync())
            {
                while (true)
                {
                    SmsMessage sms = await receiver.WaitForSms("+41798074288");
                    Console.WriteLine(sms.From);
                }
            }

            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
            Console.WriteLine("Disconecting...");
        }


        private static IServiceProvider BuildServiceProvider()
        {
            IServiceCollection services = new ServiceCollection();
            services.AddMagnet("abcda")
                        .UseHttp("http://localhost:5000");
            return services.BuildServiceProvider();
        }
    }
}
