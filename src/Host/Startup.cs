using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Magnet.GraphQL;
using Magnet.Store.Mongo;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Magnet.Server;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        //SendGrid parser Sync IO issue
        //https://github.com/Jericho/StrongGrid/issues/300
        services.Configure<KestrelServerOptions>(options =>
        {
            options.AllowSynchronousIO = true;
        });

        services.AddControllers();
        services.AddMagnet()
                    .AddSendGridEmail()
                    .AddTwilioSms()
                    .AddAzureDevOps()
                    .AddRabbitMQ(Configuration)
                    .AddMongoStore(Configuration);

        services.AddAuthentication("fake")
            .AddCookie("fake");

        services.AddAuthorization(o => o.AddPolicy(
            "Magnet.Read",
            p => p.RequireAssertion(c =>
            {
                return true;
            })));

        services.AddGraphQLServices();
        services.AddCors(options =>
        {
            options.AddDefaultPolicy(
            builder =>
            {
                builder.AllowAnyOrigin();
                builder.AllowAnyMethod();
                builder.AllowAnyHeader();
            });
        });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        app.UseCors();
        app.UseRouting();

        app.UseAuthorization();
        app.UseAuthentication();

        app.Use(async (context, next) =>
        {
            var identity = new ClaimsIdentity( new List<Claim>() { new Claim("sub", "admin") }, "fake");
            await context.SignInAsync("fake", new ClaimsPrincipal(identity));
            await next.Invoke();
        });

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapGraphQL();
        });
    }
}
