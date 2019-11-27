using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace Magnet.Tests
{
    public class MessageGunServiceCollectionExtensionsTests
    {
        [Fact]
        public void AddMessageGun_ServiceRegistred()
        {
            //arrange
            IServiceCollection services = new ServiceCollection();

            //act
            services.AddMessageGun();

            //assert
            ServiceDescriptor regService = services.FirstOrDefault(x => x.ServiceType == typeof(IMessageGun));
            ServiceDescriptor regOptions = services.FirstOrDefault(x => x.ServiceType == typeof(MessageGunOptions));

            regService.ImplementationType.Should().Be(typeof(MessageGun));
            regOptions.Should().NotBeNull();
        }

        [Fact]
        public void AddMessageGun_WithOptions_OptionsValidated()
        {
            //arrange
            IServiceCollection services = new ServiceCollection();
            var options = new MessageGunOptions
            {
                HttpClientName = "foo"
            };

            //act
            services.AddMessageGun(options);

            //assert
            ServiceProvider sp = services.BuildServiceProvider();
            MessageGunOptions resolvedOptions = sp.GetService<MessageGunOptions>();
            resolvedOptions.Should().BeEquivalentTo(options);

        }
    }
}
