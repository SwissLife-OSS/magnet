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
            IServiceCollection services = new ServiceCollection();
            services.AddSingleton<IMessageStreamClient, MessageStreamClient>();

            services.AddSingleton(new MagnetOptions
            {
                ClientName = "a",
                Grpc = new GrpcOptions
                {
                    Address = "https://localhost:5001"
                }
            });

            services.AddSingleton(c => c.GetService<MagnetOptions>().Grpc);
            return services.BuildServiceProvider();
        }

    }
}
