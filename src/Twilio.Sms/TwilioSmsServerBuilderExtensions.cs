using System;
using System.Collections.Generic;
using System.Text;
using Magnet.Providers.Twilio.Sms;
using Microsoft.Extensions.DependencyInjection;

namespace Magnet
{
    public static class TwilioSmsServerBuilderExtensions
    {
        public static MagnetServerBuilder AddTwilioSms(this MagnetServerBuilder builder)
        {
            builder.Services.AddControllers()
                    .AddApplicationPart(typeof(SmsController).Assembly);
            return builder;
        }
    }
}
