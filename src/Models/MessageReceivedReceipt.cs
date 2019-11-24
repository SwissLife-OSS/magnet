using System;

namespace Magnet
{
    public class MessageReceivedReceipt
    {
        public Guid MessageId { get; set; }

        public bool IsMatch { get; set; }

        public string ClientName { get; set; }

        public DateTime ReceivedAt { get; set; }
    }
}
