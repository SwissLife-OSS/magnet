using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;

namespace Magnet.Store.Mongo
{
    public class MessageStore : IMessageStore
    {
        private readonly MessageDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ILogger<MessageStore> _logger;

        public MessageStore(
            MessageDbContext dbContext,
            IMapper mapper,
            ILogger<MessageStore> logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task AddAsync(MagnetMessage message, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Add message to store {messageId}", message.Id);
            try
            {
                MessageRecord record = _mapper.Map<MessageRecord>(message);
                record.ReceivedLog = new List<MessageReceivedLog>();
                await _dbContext.Messages.InsertOneAsync(record, options: null, cancellationToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in Add");
                throw;
            }
        }

        public async Task AddReadReceiptAsync(
            MessageReceivedReceipt receipt,
            CancellationToken cancellationToken)
        {
            _logger.LogInformation("Add ReadReceipt to store {messageId}", receipt.MessageId);

            var log = new MessageReceivedLog
            {
                ClientName = receipt.ClientName,
                IsMatch = receipt.IsMatch,
                ReceivedAt = receipt.ReceivedAt
            };

            UpdateDefinition<MessageRecord> update =
                Builders<MessageRecord>.Update.Push(x => x.ReceivedLog, log);

            UpdateResult updRes = await _dbContext.Messages.UpdateOneAsync(
                x => x.Id == receipt.MessageId,
                update,
                options: new UpdateOptions { IsUpsert = false },
                cancellationToken);
        }
    }
}
