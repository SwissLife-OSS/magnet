using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Authorization;
using HotChocolate.Data;
using HotChocolate.Types;

namespace Magnet.GraphQL;

[ExtendObjectType(OperationTypeNames.Query)]
public class MessageQueries
{
    [Authorize(Policy = "Magnet.Read")]
    [UsePaging]
    [UseFiltering]
    public async Task<List<MessageRecord>> GetMessages(
        [Service] IMessageStore store,
        CancellationToken cancellationToken)
    {
        return await store.GetAllAsync(cancellationToken);
    }

    [Authorize(Policy = "Magnet.Read")]
    public async Task<MessageRecord> GetMessage(
        [Service] IMessageStore store,
        Guid id,
        CancellationToken cancellationToken)
    {
        return await store.GetById(id, cancellationToken);
    }
}
