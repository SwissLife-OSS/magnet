using MongoDB.Driver;

namespace Magnet.Store.Mongo;

public class MessageDbContext
{
    private readonly IMongoClient _mongoClient;
    private readonly DatabaseOptions _options;

    public MessageDbContext(IMongoClient mongoClient, DatabaseOptions options)
    {
        _mongoClient = mongoClient;
        _options = options;
    }

    private IMongoDatabase Database => _mongoClient.GetDatabase(_options.Name);

    public IMongoCollection<MessageRecord> Messages
        => Database.GetCollection<MessageRecord>("messages");
}
