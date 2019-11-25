using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate.Types;

namespace Magnet.GraphQL
{
    public class QueryType : ObjectType<Query>
    {
        protected override void Configure(
            IObjectTypeDescriptor<Query> descriptor)
        {
            descriptor
               .Field(s => s.GetMessages(default))
               .Name("messages")
               .Type<ListType<MessageType>>();
        }
    }

    public class Query
    {
        private readonly IMessageStore _store;

        public Query(IMessageStore store)
        {
            _store = store;
        }

        public async Task<List<MessageRecord>> GetMessages(CancellationToken cancellationToken)
        {
            return await _store.GetAllAsync(cancellationToken);
        }
    }

    public class MessageType : ObjectType<MessageRecord>
    {
        protected override void Configure(
            IObjectTypeDescriptor<MessageRecord> descriptor)
        {
            descriptor
                .BindFields(BindingBehavior.Explicit);

            descriptor
                .Field(d => d.Id)
                .Type<NonNullType<IdType>>();

            descriptor
                 .Field(d => d.ReceivedAt);

            descriptor
                .Field(d => d.Type)
                .Type<NonNullType<StringType>>();

            descriptor
                .Field(d => d.From)
                .Type<NonNullType<StringType>>();


            descriptor
                .Field(d => d.Body)
                .Type<StringType>();


            descriptor
                .Field(d => d.To)
                .Type<ListType<StringType>>();

            descriptor
                .Field("primaryReceipient")
                .Type<NonNullType<StringType>>()
                .Resolver((ctx) =>
                {
                    return ctx.Parent<MessageRecord>().To.Single();
                });

            descriptor
                .Field(d => d.ReceivedLog);

            descriptor
                .Field(d => d.Provider)
                .Type<NonNullType<StringType>>();

            descriptor
                 .Field(d => d.Properties);
        }
    }
}
