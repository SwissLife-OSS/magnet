using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Magnet.Store.Mongo
{
    public class MessageStore : IMessageStore
    {
        private readonly MessageDbContext _dbContext;
        private readonly IMapper _mapper;

        public MessageStore(MessageDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task AddAsync(MagnetMessage message, CancellationToken cancellationToken)
        {
            MessageRecord record = _mapper.Map<MessageRecord>(message);
            record.ReceivedLog = new List<MessageReceivedLog>();
            await _dbContext.Messages.InsertOneAsync(record, options: null, cancellationToken);
        }

        public async Task AddReadReceiptAsync(
            MessageReceivedReceipt receipt,
            CancellationToken cancellationToken)
        {
            var hist = new MessageReceivedLog
            {
                ClientName = receipt.ClientName,
                IsMatch = receipt.IsMatch,
                ReceivedAt = receipt.ReceivedAt
            };

            UpdateDefinition<MessageRecord> update =
                Builders<MessageRecord>.Update.Push(x => x.ReceivedLog, hist);

            UpdateResult updRes = await _dbContext.Messages.UpdateOneAsync(
                x => x.Id == receipt.MessageId,
                update,
                options: new UpdateOptions { IsUpsert = false },
                cancellationToken);
        }
    }
}
