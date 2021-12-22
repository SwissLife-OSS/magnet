using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate.AspNetCore.Authorization;

namespace Magnet.GraphQL;

public class Query
{
    private readonly IMessageStore _store;

    public Query(IMessageStore store)
    {
        _store = store;
    }

    [Authorize(Policy = "Messages.View")]
    public async Task<List<MessageRecord>> GetMessages(CancellationToken cancellationToken)
    {
        return await _store.GetAllAsync(cancellationToken);
    }

    [Authorize(Policy = "Messages.View")]
    public async Task<MessageRecord> GetMessage(Guid id, CancellationToken cancellationToken)
    {
        return await _store.GetById(id, cancellationToken);
    }
}
