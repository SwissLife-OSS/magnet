using System;
using System.Collections.Generic;

namespace Magnet.Client
{
    public class EmailMessage
    {
        public DateTime ReceivedAt { get; set; }
        public string From { get; set; }
        public string Text { get; set; }
        public string Html { get; set; }
        public IReadOnlyList<string> To { get; set; }
        public Guid Id { get; set; }
        public string Subject { get; set; }
        public IReadOnlyDictionary<string, string> Properties { get; set; }
    }
}
