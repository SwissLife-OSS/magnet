using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Magnet
{
    public interface IMessageBus : IDisposable
    {
        Task<string> PublishAsync(MagnetMessage message);

        Task<MagnetMessage> GetNextAsync(string name);

        void RegisterMessageHandler(
            string name,
            Func<MagnetMessage, CancellationToken, Task> handler);
    }
}
