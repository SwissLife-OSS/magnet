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
               //.Authorize("Magnet.Read")
               .Type<ListType<MessageType>>();

            descriptor
               .Field(s => s.GetMessage(default, default))
               .Name("message")
               //.Authorize("Magnet.Read")
               .Type<MessageType>();
        }
    }
}
