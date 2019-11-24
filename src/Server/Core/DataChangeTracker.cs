using Microsoft.Extensions.Logging;

namespace Magnet
{
    public class DataChangeTracker
    {
        private readonly IMessageBus _messageBus;
        private readonly IMessageStore _store;
        private readonly ILogger<DataChangeTracker> _logger;

        public DataChangeTracker(
            IMessageBus messageBus,
            IMessageStore store,
            ILogger<DataChangeTracker> logger)
        {
            _messageBus = messageBus;
            _store = store;
            _logger = logger;

        }

        public void Start()
        {
            _logger.LogInformation("Start DataChange tracker...");
            _messageBus.RegisterMessageHandler("store", async (msg, token) =>
            {
                _logger.LogInformation("New Message");
                await _store.AddAsync(msg, token);
            });
        }

        public void Stop()
        {
            _messageBus.Dispose();
        }
    }
}
