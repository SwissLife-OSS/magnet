using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Magnet.Server;

public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
       Host.CreateDefaultBuilder(args)
            .ConfigureLogging(configure =>
           {
               configure.AddConsole();
           })
            .ConfigureAppConfiguration(builder =>
           {
               builder.AddJsonFile("appsettings.json");
               builder.AddJsonFile("appsettings.user.json", optional: true);
               builder.AddEnvironmentVariables();
           }).ConfigureServices(services =>
           {
                   //services.AddHostedService<BackgroundWorker>();
               })
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
}
