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

        }

        private static IServiceProvider BuildServiceProvider()
        {
            IConfiguration config = new ConfigurationBuilder()
                        .AddJsonFile("appsettings.json")
                        .AddJsonFile("appsettings.user.json", optional: true)
                        .Build();

            IServiceCollection services = new ServiceCollection();
            services.AddMagnet(config);
            services.AddServiceBus(config);
            return services.BuildServiceProvider();
        }

    }
}
