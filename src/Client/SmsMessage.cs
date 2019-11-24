using System;

namespace Magnet.Client
{
    public class SmsMessage
    {
        public string From { get; set; }

        public string To { get; set; }

        public string Body { get; set; }
        public DateTime ReceivedAt { get; internal set; }
        public Guid Id { get; internal set; }
    }

}
