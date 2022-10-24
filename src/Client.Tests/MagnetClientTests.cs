using System;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace Magnet.Client.Tests;

public class MagnetClientTests
{
    [Fact(Skip = "Local only")]
    public Task WaitFor_SmsMessage_Recived()
    {
        IServiceProvider service = BuildServiceProvider();
        MagnetClient magnet = service.GetService<MagnetClient>();
        return Task.CompletedTask;
    }

    private static IServiceProvider BuildServiceProvider()
    {
        IServiceCollection services = new ServiceCollection();
        services.AddMagnet("a")
                       .UseHttp("http://localhost:5000");

        return services.BuildServiceProvider();
    }

}
