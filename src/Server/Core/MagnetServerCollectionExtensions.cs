using AutoMapper;
using Microsoft.Extensions.DependencyInjection;

namespace Magnet;

public static class MagnetServerCollectionExtensions
{
    public static MagnetServerBuilder AddMagnet(this IServiceCollection services)
    {
        var builder = new MagnetServerBuilder(services);
        services.AddSingleton<IMessageSink, MessageSink>();
        services.AddSingleton<IMessageStore, InMemoryMessageStore>();
        services.AddSingleton<DataChangeTracker>();
        services.AddAutoMapper(typeof(MappingProfile));
        return builder;
    }
}
