using System;
using System.Collections.Generic;
using System.Text;
using Magnet.Providers.SendGrid.Email;
using Microsoft.Extensions.DependencyInjection;

namespace Magnet
{
    public static class SendGridServerBuilderExtensions
    {
        public static MagnetServerBuilder AddSendGridEmail(this MagnetServerBuilder builder)
        {
            builder.Services.AddControllers()
                    .AddApplicationPart(typeof(EmailController).Assembly);
            return builder;
        }
    }
}
