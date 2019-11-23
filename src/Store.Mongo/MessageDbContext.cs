using MongoDB.Driver;

namespace Magnet.Store.Mongo
{
    public class MessageDbContext
    {
        private readonly MongoClient _mongoClient;
        private readonly DatabaseOptions _options;

        public MessageDbContext(MongoClient mongoClient, DatabaseOptions options)
        {
            _mongoClient = mongoClient;
            _options = options;
        }

        private IMongoDatabase Database => _mongoClient.GetDatabase(_options.Name);

        public IMongoCollection<MessageRecord> Messages
            => Database.GetCollection<MessageRecord>("messages");

    }
}
