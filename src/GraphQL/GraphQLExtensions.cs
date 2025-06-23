using HotChocolate.Types;
using Microsoft.Extensions.DependencyInjection;

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
            .ModifyRequestOptions(opt => opt.IncludeExceptionDetails = true);
            // .AddAuthorization();
        return services;
    }
}
