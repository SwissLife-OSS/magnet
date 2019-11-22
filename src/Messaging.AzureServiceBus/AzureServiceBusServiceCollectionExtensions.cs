using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Magnet.Messaging.AzureServiceBus
{
    public static class AzureServiceBusServiceCollectionExtensions
    {
        public static IServiceCollection AddServiceBus(
           this IServiceCollection services,
           IConfiguration configuration)
        {

            IConfigurationSection section = configuration.GetSection("Magnet:ServiceBus");
            AzureServiceBusOptions option = section.Get<AzureServiceBusOptions>();
            services.AddSingleton(option);
            services.AddSingleton<IMessageBus, AzureServiceBusMessageBus>();
            return services;
        }
    }
}
