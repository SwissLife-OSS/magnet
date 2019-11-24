using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Magnet.Messaging.AzureServiceBus;
using Microsoft.Extensions.Logging;
using Magnet.Grpc;
using Magnet.Store.Mongo;
using HotChocolate.AspNetCore;
using Magnet.GraphQL;
using Microsoft.AspNetCore.Server.Kestrel.Core;

namespace Magnet.Server
{
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
            services.AddGrpc();
            services.AddControllers();
            services.AddMagnet()
                        .AddSendGridEmail()
                        .AddTwilioSms()
                        .AddRabbitMQ(Configuration)
                        //.AddAzureServiceBus(Configuration)
                        .AddMongoStore(Configuration);

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
            app.UseGraphQL();
            app.UsePlayground();

            app.UseEndpoints(endpoints =>
            {
                //endpoints.MapGrpcService<MessageStreamService>();
                endpoints.MapControllers();
                //endpoints.MapHub<MessageHub>("messagehub");
            });

            app.ApplicationServices.GetService<DataChangeTracker>();
        }
    }
}
