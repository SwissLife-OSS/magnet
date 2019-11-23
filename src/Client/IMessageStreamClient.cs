using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Magnet.Client
{
    public interface IMessageStreamClient
    {
        Task AddReceivedReceiptAsync(
            MessageReceivedReceipt readReceipt,
            CancellationToken cancellationToken);

        Task<MagnetMessage> GetNextAsync(
            string clientName,
            CancellationToken cancellationToken);
    }
}
