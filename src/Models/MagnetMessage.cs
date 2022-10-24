using System;
using System.Collections.Generic;

namespace Magnet;

public class MagnetMessage
{
    public Guid Id { get; set; }

    public string Type { get; set; }

    public DateTime ReceivedAt { get; set; }

    public string From { get; set; }

    public IList<string> To { get; set; }

    public string Body { get; set; }

    public IReadOnlyDictionary<string, string> Properties { get; set; }
    public string Provider { get; set; }
}
