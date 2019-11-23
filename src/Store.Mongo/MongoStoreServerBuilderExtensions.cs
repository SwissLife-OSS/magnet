using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;

namespace Magnet.Store.Mongo
{
    public static class MongoStoreServerBuilderExtensions
    {
        public static MagnetServerBuilder AddMongoStore(
               this MagnetServerBuilder builder,
               IConfiguration configuration)
        {
            IConfigurationSection section = configuration.GetSection("Magnet:MongoDb");
            DatabaseOptions options = section.Get<DatabaseOptions>();

            if ( options?.ConnectionString != null)
            {
                builder.AddMongoStore(options);
            }
            return builder;
        }


        public static MagnetServerBuilder AddMongoStore(
               this MagnetServerBuilder builder,
               DatabaseOptions options)
        {
            builder.SetMessageStore<MessageStore>();
            builder.Services.AddSingleton(options);
            builder.Services.AddSingleton((c) =>
               new MessageDbContext(new MongoClient(options.ConnectionString), options));
            builder.Services.AddAutoMapper(typeof(MappingProfile));
            return builder;
        }
    }
}
