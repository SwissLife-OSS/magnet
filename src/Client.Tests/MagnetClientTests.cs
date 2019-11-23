using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Magnet.Messaging.AzureServiceBus;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace Magnet.Client.Tests
{
    public class MagnetClientTests
    {
        [Fact]
        public async Task A()
        {
            IServiceProvider service = BuildServiceProvider();
            MagnetClient magnet = service.GetService<MagnetClient>();
            SmsMessage sms = await magnet.WaitFor<SmsMessage>();

            SmsMessage sms2 = await magnet.WaitFor<SmsMessage>();

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
