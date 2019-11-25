using System;
using System.Threading;
using System.Threading.Tasks;

namespace Magnet
{
    public interface IMessageBus : IDisposable
    {
        Task<string> PublishAsync(MagnetMessage message);

        void RegisterMessageHandler(
            string name,
            Func<MagnetMessage, CancellationToken, Task> handler);

        Task<MagnetMessage> GetNextAsync(string name, CancellationToken cancellationToken);
    }
}
