using System;
using System.Collections.Generic;
using System.Text;
using Magnet.Client.Mappers;
using Magnet.Mappers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Magnet.Client
{
    public static class MagnetClientServiceCollectionExtensions
    {
        public static IServiceCollection AddMagnet(this IServiceCollection services,
                                           IConfiguration configuration)
        {
            services.AddTransient<MagnetClient>();

            var typeReg = new MessageTypeRegistration
            {
                MessageType = typeof(EmailMessage),
                Name = "Email",
                Mapper = new EmailMapper()
            };
            var sms = new MessageTypeRegistration
            {
                MessageType = typeof(SmsMessage),
                Name = "Sms",
                Mapper = new SmsMapper()
            };

            services.AddSingleton(new MagnetOptions { ClientName = "all" });
            services.AddSingleton(typeReg);
            services.AddSingleton<MessageMapperFactory>();
            services.AddSingleton(sms);
            return services;
        }
    }
}
