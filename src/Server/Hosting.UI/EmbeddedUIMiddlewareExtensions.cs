using Microsoft.AspNetCore.Builder;

namespace Hosting.UI;

public static class EmbeddedUiMiddlewareExtensions
{
    public static IApplicationBuilder UseMagnetUi(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<EmbeddedUiMiddleware>();
    }
}

