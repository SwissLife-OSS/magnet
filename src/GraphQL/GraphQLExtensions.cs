using HotChocolate.Types;
using HotChocolate.Data.Filters;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace Magnet.GraphQL;

public static class GraphQLExtensions
{
    public static IServiceCollection AddGraphQLServices(
        this IServiceCollection services)
    {        
        services
            .AddGraphQLServer()
            .AddQueryType()
            .AddTypeExtension<MessageQueries>()
            .AddType<MessageType>()
            .AddFiltering()
            .ConfigureSchema(x => x.AddType(new UuidType("Uuid", defaultFormat: 'N')))
            .AddAuthorization();

        return services;
    }
}
