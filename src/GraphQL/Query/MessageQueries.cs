using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;

namespace Magnet.GraphQL;

[ExtendObjectType(OperationTypeNames.Query)]
public  class MessageQueries
{
    [Authorize(Policy = "Magnet.Read")]
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
