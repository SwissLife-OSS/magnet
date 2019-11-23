using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Magnet.Client
{
    public interface IMessageStreamClient
    {
        Task RegisterMessageReceivedHandler(string clientName, Action<MagnetMessage> handler);

        Task AddReadReceiptAsync(MessageReceivedReceipt readReceipt);

        Task UnSubscribe(string clientName, string token);

        Task<MagnetMessage> GetNextAsync(
            string clientName,
            CancellationToken cancellationToken);
    }
}
