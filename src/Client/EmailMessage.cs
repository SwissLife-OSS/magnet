using System;
using System.Collections.Generic;
using System.Text;

namespace Magnet
{
    public class EmailMessage 
    {
        public DateTime ReceivedAt { get; set; }

        public string From { get; set; }
        public string Text { get; set; }
        public string Html { get; set; }
        public IReadOnlyList<string> To { get; set; }

    }

    public class SmsMessage
    {
        public string MessageId { get; set; }

        public string From { get; set; }

        public string To { get; set; }

        public string Body { get; set; }
        public DateTime ReceivedAt { get; internal set; }
    }

}
