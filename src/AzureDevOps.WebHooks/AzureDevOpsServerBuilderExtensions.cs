using Magnet.Providers.AzureDevOps;
using Microsoft.Extensions.DependencyInjection;

namespace Magnet
{
    public static class AzureDevOpsServerBuilderExtensions
    {
        public static MagnetServerBuilder AddAzureDevOps(this MagnetServerBuilder builder)
        {
            builder.Services.AddControllers()
                    .AddApplicationPart(typeof(WorkItemController).Assembly);
            builder.Services.AddSingleton<WorkItemEventDeserializer>();
            return builder;
        }
    }
}
