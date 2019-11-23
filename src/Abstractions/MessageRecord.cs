using System;
using System.Collections.Generic;
using System.Text;

namespace Magnet
{
    public class MessageRecord : MagnetMessage
    {
        public List<MessageReceivedLog> ReceivedLog { get; set; }
    }

    public class MessageReceivedLog
    {
        public DateTime ReceivedAt { get; set; }

        public string ClientName { get; set; }
        public bool IsMatch { get; set; }
    }
}
