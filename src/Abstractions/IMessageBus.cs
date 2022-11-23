using System;
using System.Threading;
using System.Threading.Tasks;

namespace Magnet;

public interface IMessageBus : IAsyncDisposable
{
    Task<string> PublishAsync(MagnetMessage message);

    Task RegisterMessageHandler(
        string name,
        Func<MagnetMessage, CancellationToken, Task> handler,
        CancellationToken cancellationToken);

    Task<MagnetMessage> GetNextAsync(string name, CancellationToken cancellationToken);
    Task<string> SubscribeAsync(string name, CancellationToken cancellationToken);
    Task UnSubscribeAsync(string name, CancellationToken cancellationToken);
}
