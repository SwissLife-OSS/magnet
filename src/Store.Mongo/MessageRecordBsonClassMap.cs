using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;

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
                // Map MongoDB's _id (ObjectId) to our Id (Guid) property
                cm.MapIdMember(c => c.Id)
                  .SetSerializer(new ObjectIdToGuidSerializer());
            });
        }

        if (!BsonClassMap.IsClassMapRegistered(typeof(MessageRecord)))
        {
            BsonClassMap.RegisterClassMap<MessageRecord>(cm =>
            {
                cm.AutoMap();
                // Ignore any extra 'Id' field that might exist in MongoDB
                cm.SetIgnoreExtraElements(true);
            });
        }
    }
}

// Custom serializer to convert ObjectId to Guid
public class ObjectIdToGuidSerializer : SerializerBase<System.Guid>
{
    public override System.Guid Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
    {
        var bsonType = context.Reader.GetCurrentBsonType();
        switch (bsonType)
        {
            case BsonType.ObjectId:
                var objectId = context.Reader.ReadObjectId();
                // Convert ObjectId to Guid by using its bytes
                var bytes = objectId.ToByteArray();
                // Pad to 16 bytes for Guid
                var guidBytes = new byte[16];
                Array.Copy(bytes, guidBytes, Math.Min(bytes.Length, 16));
                return new System.Guid(guidBytes);
            case BsonType.String:
                var stringValue = context.Reader.ReadString();
                return System.Guid.Parse(stringValue);
            default:
                throw new BsonSerializationException($"Cannot deserialize Guid from BsonType {bsonType}");
        }
    }

    public override void Serialize(BsonSerializationContext context, BsonSerializationArgs args, System.Guid value)
    {
        context.Writer.WriteString(value.ToString());
    }
}
