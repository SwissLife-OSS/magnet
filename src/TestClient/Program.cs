using System;
using System.Threading.Tasks;
using Magnet.Client;
using Magnet.Client.AzureDevOps;
using Microsoft.Extensions.DependencyInjection;

namespace TestClient;

class Program
{
    static async Task Main(string[] args)
    {
        IServiceProvider services = BuildServiceProvider();
        MagnetClient mg = services.GetService<MagnetClient>();

        await using(MessageReceiver receiver = await mg.StartAsync(default))
        {
            while (true)
            {
                //WorkItemEventMessage wi = await receiver.WaitForWorkItemUpdatedEvent(
                //    17006,
                //    new WaitOptions { Timeout = 120 });

                WorkItemEventMessage wi = await receiver.WaitForWorkItemCreatedEvent(
                    "Magnet",
                    new WaitOptions { Timeout = 120 });


                Console.WriteLine(wi.Message);
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
                    .RegisterAzureDevOps()
                    .UseHttp("http://localhost:5000");

        return services.BuildServiceProvider();
    }
}
