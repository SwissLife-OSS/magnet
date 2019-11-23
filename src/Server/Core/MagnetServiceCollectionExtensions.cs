using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Magnet
{
    public static class MagnetServiceCollectionExtensions
    {
        public static IServiceCollection AddMagnet(this IServiceCollection services)
        {
            services.AddSingleton<IMessageSink, MessageSink>();
            services.AddSingleton<DataChangeTracker>();
            return services;
        }
    }
}
