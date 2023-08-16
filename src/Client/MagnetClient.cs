using System.Threading;
using System.Threading.Tasks;
using Magnet.Client.Mappers;

namespace Magnet.Client;

public class MagnetClient
{
    internal MessageMapperFactory MessageMapper { get; }
    internal IMessageStreamClient MessageStreamClient { get; }
    internal MagnetOptions Options { get; }

    public MagnetClient(
        MessageMapperFactory messageMapper,
        IMessageStreamClient messageStreamClient,
        MagnetOptions options)
    {
        MessageMapper = messageMapper;
        MessageStreamClient = messageStreamClient;
        Options = options;
    }

    public async Task<MessageReceiver> StartAsync(CancellationToken cancellationToken)
    {
        var queueName = await MessageStreamClient
            .Subscribe(Options.ClientName, cancellationToken);

        return new MessageReceiver(this, queueName);
    }
}
