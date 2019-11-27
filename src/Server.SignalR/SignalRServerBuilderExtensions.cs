using Magnet.Server.SignalR;
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
