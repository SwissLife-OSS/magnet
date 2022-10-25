using HotChocolate;
using Microsoft.Extensions.DependencyInjection;

namespace Magnet.GraphQL;

public static class GraphQLExtensions
{
    public static IServiceCollection AddGraphQLServices(
        this IServiceCollection services)
    {
        services.AddGraphQLServer()
            .AddQueryType()
            .AddTypeExtension<MessageQueries>()
            .AddType<MessageType>()
            .AddFiltering()
            .AddAuthorization();

        return services;
    }
}
