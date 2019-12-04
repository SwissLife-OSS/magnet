using System;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace Magnet.Client.Tests
{
    public class MagnetClientTests
    {
        [Fact( Skip = "Local only")]
        public async Task WaitFor_SmsMessage_Recived()
        {
            IServiceProvider service = BuildServiceProvider();
            MagnetClient magnet = service.GetService<MagnetClient>();
        }

        private static IServiceProvider BuildServiceProvider()
        {
            IServiceCollection services = new ServiceCollection();
            services.AddMagnet("a")
                           .UseHttp("http://localhost:5000");
                        //.UseGrpc("https://localhost:5001");
                        //.UseSignalR("http://localhost:5000");

            return services.BuildServiceProvider();
        }

    }
}
