using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;

namespace Magnet
{
    public static class MessageGunServiceCollectionExtensions
    {
        public static IServiceCollection AddMessageGun(this IServiceCollection services)
        {
            services.AddMessageGun(new MessageGunOptions());
            return services;
        }


        public static IServiceCollection AddMessageGun(
            this IServiceCollection services,
            MessageGunOptions options)
        {
            services.AddSingleton(options);
            services.AddSingleton<IMessageGun, MessageGun>();

            return services;
        }


    }
}
