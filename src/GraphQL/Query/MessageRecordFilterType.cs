using HotChocolate.Data.Filters;

namespace Magnet.GraphQL;

public class MessageRecordFilterType : FilterInputType<MessageRecord>
{
    protected override void Configure(IFilterInputTypeDescriptor<MessageRecord> descriptor)
    {
        descriptor.Field(f => f.Id);
        descriptor.Field(f => f.ReceivedAt);
        descriptor.Field(f => f.Type);
        descriptor.Field(f => f.From);
        descriptor.Field(f => f.Body);
        descriptor.Field(f => f.Title);
        descriptor.Field(f => f.To);
        descriptor.Field(f => f.Provider);
        descriptor.Field(f => f.Properties);
        descriptor.Field(f => f.ReceivedLog);
    }
}
