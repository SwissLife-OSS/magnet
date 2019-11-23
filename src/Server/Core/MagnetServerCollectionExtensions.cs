using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Magnet
{
    public static class MagnetServerCollectionExtensions
    {
        public static MagnetServerBuilder AddMagnet(this IServiceCollection services)
        {
            var builder = new MagnetServerBuilder(services);
            services.AddSingleton<IMessageSink, MessageSink>();
            services.AddSingleton<IMessageStore, NoOpMessageStore>();
            services.AddSingleton<DataChangeTracker>();
            return builder;
        }
    }
}
