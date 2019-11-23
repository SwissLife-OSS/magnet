using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;

namespace Magnet.Store.Mongo
{
    public static class MongoStoreServiceCollectionExtensions
    {
        public static IServiceCollection AddMongoStore(
               this IServiceCollection services,
               IConfiguration configuration)
        {

            IConfigurationSection section = configuration.GetSection("Magnet:MongoDb");
            DatabaseOptions option = section.Get<DatabaseOptions>();
            services.AddSingleton(option);
            services.AddSingleton((c) =>
               new MessageDbContext(new MongoClient(option.ConnectionString), option));

            services.AddSingleton<IMessageStore, MessageStore>();
            services.AddAutoMapper(typeof(MappingProfile));
            return services;
        }
    }
}
