using Magnet.Messaging.RabbitMQ;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RabbitMQ.Client;

namespace Magnet
{
    public static class RabbitMQBuilderExtensions
    {
        public static MagnetServerBuilder AddRabbitMQ(
           this MagnetServerBuilder builder,
           IConfiguration configuration)
        {
            IConfigurationSection section = configuration.GetSection("Magnet:RabbitMQ");
            RabbitMQOptions options = section.Get<RabbitMQOptions>();
            builder.AddRabbitMQ(options);
            return builder;
        }

        public static MagnetServerBuilder AddRabbitMQ(
            this MagnetServerBuilder builder,
            RabbitMQOptions options)
        {
            builder.Services.AddSingleton(options);
            builder.Services.AddSingleton<IMessageBus, MessageBus>();

            var conn = new ConnectionFactory()
            {
                HostName = options.Hostname,
                Port = options.Port
            };

            if ( options.UserName != null)
            {
                conn.UserName = options.UserName;
                conn.Password = options.Password;
            }

            builder.Services.AddSingleton(conn);
            return builder;
        }
    }
}
