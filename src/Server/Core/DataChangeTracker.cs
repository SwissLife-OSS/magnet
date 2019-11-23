using System;
using System.Collections.Generic;
using System.Text;

namespace Magnet
{
    public class DataChangeTracker
    {
        private readonly IMessageBus _messageBus;
        private readonly IMessageStore _store;

        public DataChangeTracker(IMessageBus messageBus, IMessageStore store)
        {
            _messageBus = messageBus;
            _store = store;
            _messageBus.RegisterMessageHandler("store", async (msg, token) =>
            {
                await _store.AddAsync(msg, token);
            });
        }
    }
}
