using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit.Abstractions;

namespace Magnet
{
    public static class MagnetServiceCollectionExtensions
    {
        public static IServiceCollection AddMagnet(this IServiceCollection services)
        {
            services.AddSingleton<IMessageSink, MessageSink>();
            return services;
        }
    }
}
