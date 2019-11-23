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
            services.AddGrpc();
            services.AddControllers();
            services.AddMagnet()
                        .AddSendGridEmail()
                        .AddTwilioSms()
                        .AddAzureServiceBus(Configuration)
                        .AddMongoStore(Configuration);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseAuthorization();

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
