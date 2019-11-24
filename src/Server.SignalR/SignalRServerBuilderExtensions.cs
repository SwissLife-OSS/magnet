using System;
using System.Collections.Generic;
using System.Text;
using Magnet.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Magnet
{
    public static class SignalRServerBuilderExtensions
    {
        public static MagnetServerBuilder AddSignalR(
           this MagnetServerBuilder builder)
        {
            builder.Services.AddSignalR();
            builder.Services.AddSingleton<MessageListener>();
            return builder;
        }
    }
}
