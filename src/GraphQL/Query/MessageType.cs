using System.Linq;
using HotChocolate.Types;

namespace Magnet.GraphQL;

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
            .Resolve(ctx =>
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

        descriptor
            .Field("title")
            .Type<NonNullType<StringType>>()
            .Resolve(ctx =>
            {
                return ctx.Parent<MessageRecord>().GetTitle();
            });
    }
}
