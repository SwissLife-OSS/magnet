using Microsoft.AspNetCore.Builder;

namespace Magnet.Hosting.UI;

public static class EmbeddedUiMiddlewareExtensions
{
    public static IApplicationBuilder UseMagnetUi(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<EmbeddedUiMiddleware>();
    }
}

