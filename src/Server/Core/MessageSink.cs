using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Magnet
{
    public class MessageSink : IMessageSink
    {
        private readonly IMessageBus _messageBus;

        public MessageSink(IMessageBus messageBus)
        {
            _messageBus = messageBus;
        }


        public async Task<string> ProcessMessageAsync(MagnetMessage message)
        {
            message.Id = Guid.NewGuid();
            message.ReceivedAt = DateTime.UtcNow;
            return await _messageBus.PublishAsync(message);
        }
    }
}
