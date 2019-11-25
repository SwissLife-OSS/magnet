using System.Collections.Generic;
using System.Text;
using Magnet.Client.Mappers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Magnet.Client
{
    public static class MagnetClientServiceCollectionExtensions
    {
        public static MagnetClientBuilder AddMagnet(
            this IServiceCollection services,
            string clientName)
        {
            services.AddDefaultServices();
            var builder = new MagnetClientBuilder(services);
            builder.WithClientName(clientName);
            return builder;
        }

        public static MagnetClientBuilder AddMagnet(this IServiceCollection services)
        {
            services.AddDefaultServices();
            return new MagnetClientBuilder(services);
        }

        private static IServiceCollection AddDefaultServices(this IServiceCollection services)
        {
            services.AddTransient<MagnetClient>();
            services.AddSingleton<MessageMapperFactory>();
            services.AddSingleton(DefaultMessageTypeRegistrations.Email);
            services.AddSingleton(DefaultMessageTypeRegistrations.Sms);
            return services;
        }

        public static MagnetClientBuilder AddMagnet(this IServiceCollection services,
                                           IConfiguration configuration)
        {
            MagnetOptions options = configuration
                .GetSection("Magnet")
                .Get<MagnetOptions>();

            if ( options == null)
            {
                throw new MagnetConfigurationException(
                    "No Magnet section found in configuration");
            }
            if ( options.ClientName == null)
            {
                throw new MagnetConfigurationException(
                    "No ClientName found in Magnet configuration section");
            }

            MagnetClientBuilder builder = services.AddMagnet(options.ClientName);
            return builder;
        }
    }
}
