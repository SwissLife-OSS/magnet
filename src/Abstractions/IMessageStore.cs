using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Magnet
{
    public interface IMessageStore
    {
        Task AddAsync(MagnetMessage message, CancellationToken cancellationToken);

        Task AddReadReceiptAsync(
            MessageReceivedReceipt receipt,
            CancellationToken cancellationToken);
        Task<List<MessageRecord>> GetAllAsync(CancellationToken cancellationToken);
    }
}
