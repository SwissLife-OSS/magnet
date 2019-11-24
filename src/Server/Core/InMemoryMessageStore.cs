using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;

namespace Magnet
{
    public class InMemoryMessageStore : IMessageStore
    {
        private readonly IMapper _mapper;
        private ConcurrentBag<MessageRecord> _messages = new ConcurrentBag<MessageRecord>();

        public InMemoryMessageStore(IMapper mapper)
        {
            _mapper = mapper;
        }

        public Task AddAsync(MagnetMessage message, CancellationToken cancellationToken)
        {
            MessageRecord record = _mapper.Map<MessageRecord>(message);
            _messages.Add(record);
            return Task.CompletedTask;
        }

        public Task AddReadReceiptAsync(MessageReceivedReceipt receipt, CancellationToken cancellationToken)
        {
            MessageRecord msg = _messages.FirstOrDefault(x => x.Id == receipt.MessageId);
            msg.ReceivedLog.Add(new MessageReceivedLog
            {
                ClientName = receipt.ClientName,
                IsMatch = receipt.IsMatch,
                ReceivedAt = receipt.ReceivedAt
            });
            return Task.CompletedTask;
        }

        public Task<List<MessageRecord>> GetAllAsync(CancellationToken cancellationToken)
        {
            var messages =  _messages
                                .OrderByDescending(x => x.ReceivedAt)
                                .Take(100)
                                .ToList();

            


            return Task.FromResult(messages);
        }
    }
}
