using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using MongoDB.Extensions.Context;
using Snapshooter.Xunit;
using Squadron;
using Xunit;

namespace Magnet.Store.Mongo.Tests;

public class MessageStoreTests : IClassFixture<MongoResource>
{
    private readonly IServiceProvider _provider;
    private readonly IMongoDatabase _database;

    public MessageStoreTests(MongoResource mongoResource)
    {
        mongoResource.Client.DisableTableScan();
        _database = mongoResource.CreateDatabase();

        var services = new ServiceCollection();

        services
            .AddLogging()
            .AddMagnet()
            .AddMongoStore(new DatabaseOptions
            {
                ConnectionString = mongoResource.ConnectionString,
                Name = _database.DatabaseNamespace.DatabaseName
            });

        _provider = services.BuildServiceProvider();
    }

    [Fact]
    public async Task AddMessage_IsInStore()
    {
        // Arrange
        IMessageStore store = _provider.GetRequiredService<IMessageStore>();

        // Act
        await store.AddAsync(CreateMessage(), default);

        // Assert
        (await _database.GetCollection<MessageRecord>("messages")
                .Find(FilterDefinition<MessageRecord>.Empty)
                .ToListAsync())
            .MatchSnapshot();
    }

    private static MagnetMessage CreateMessage()
    {
        return new MagnetMessage
        {
            Body = "563214",
            From = "foo@bar.com",
            To = new [] { "bar@foo.com" },
            Id = Guid.Parse("828DBC4F-A14E-4468-B98A-65323627F843"),
            Properties = new Dictionary<string, string>()
            {
                { "MesageId", "84CE8A10-C767-4D0F-A95D-27AB6CFB25DD" }
            },
            Provider = "SendGrid",
            Type = "Email",
            ReceivedAt = new DateTime(2022, 10, 10, 0 ,0 ,0 , DateTimeKind.Utc)
        };
    }
}
