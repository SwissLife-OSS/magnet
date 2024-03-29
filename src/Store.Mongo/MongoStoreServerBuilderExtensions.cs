using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
#nullable enable

namespace Magnet.Store.Mongo;

public static class MongoStoreServerBuilderExtensions
{
    public static MagnetServerBuilder AddMongoStore(
        this MagnetServerBuilder builder,
        IConfiguration configuration,
        Action<MongoClientSettings>? configureSettings = default)
    {
        IConfigurationSection section = configuration.GetSection("Magnet:MongoDb");
        DatabaseOptions options = section.Get<DatabaseOptions>();

        if (options?.ConnectionString != null)
        {
            builder.AddMongoStore(options, configureSettings);
        }

        return builder;
    }

    public static MagnetServerBuilder AddMongoStore(
        this MagnetServerBuilder builder,
        DatabaseOptions options,
        Action<MongoClientSettings>? configureSettings = default)
    {
        var clientSettings = MongoClientSettings
            .FromConnectionString(options.ConnectionString);

        configureSettings?.Invoke(clientSettings);

        builder.SetMessageStore<MessageStore>();
        builder.Services.AddSingleton(options);
        builder.Services.AddSingleton(_ => new MessageDbContext(
            new MongoClient(clientSettings), options));
        return builder;
    }
}
