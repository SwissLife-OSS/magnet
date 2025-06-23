using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Attributes;

namespace Magnet.Store.Mongo;

public static class MessageRecordBsonClassMap
{
    public static void Register()
    {
        if (!BsonClassMap.IsClassMapRegistered(typeof(MagnetMessage)))
        {
            BsonClassMap.RegisterClassMap<MagnetMessage>(cm =>
            {
                cm.AutoMap();
                cm.MapIdMember(c => c.Id)
                  .SetIdGenerator(MongoDB.Bson.Serialization.IdGenerators.GuidGenerator.Instance)
                  .SetSerializer(new MongoDB.Bson.Serialization.Serializers.GuidSerializer(BsonType.String));
            });
        }

        if (!BsonClassMap.IsClassMapRegistered(typeof(MessageRecord)))
        {
            BsonClassMap.RegisterClassMap<MessageRecord>(cm =>
            {
                cm.AutoMap();
                // Id mapping is inherited from MagnetMessage
            });
        }
    }
}
