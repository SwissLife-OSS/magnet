using System;
using System.Collections.Generic;
using System.Text;

namespace Magnet
{
    public class MagnetMessage
    {
        public string Type { get; set; }

        public DateTime ReceivedAt { get; set; }

        public string From { get; set; }

        public IList<string> To { get; set; }

        public string Body { get; set; }

        public IReadOnlyDictionary<string, object> Properties { get; set; }
        public string Provider { get; set; }
    }
}
