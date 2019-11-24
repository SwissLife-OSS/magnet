using System;
using HotChocolate;
using Microsoft.Extensions.DependencyInjection;

namespace Magnet.GraphQL
{
    public static class GraphQLExtensions
    {
        public static void AddGraphQLServices(
            this IServiceCollection services)
        {
            services.AddGraphQL(CreateSchema);
        }

        public static ISchema CreateSchema(
            IServiceProvider serviceProvider)
        {
            return SchemaBuilder.New()
                .AddQueryType<QueryType>()
                .AddServices(serviceProvider)
                .Create();
        }
    }
}
