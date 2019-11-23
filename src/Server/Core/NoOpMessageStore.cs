using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Magnet
{
    public class NoOpMessageStore : IMessageStore
    {
        public Task AddAsync(MagnetMessage message, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

        public Task AddReadReceiptAsync(MessageReceivedReceipt receipt, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
