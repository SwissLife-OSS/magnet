using Magnet.Providers.SendGrid;
using Microsoft.Extensions.DependencyInjection;

namespace Magnet
{
    public static class SendGridEmailServerBuilderExtensions
    {
        public static MagnetServerBuilder AddSendGridEmail(this MagnetServerBuilder builder)
        {
            builder.Services.AddControllers()
                    .AddApplicationPart(typeof(EmailController).Assembly);
            return builder;
        }
    }
}
