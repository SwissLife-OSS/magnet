using System;
using System.Collections.Generic;

namespace Magnet.Client;

public class SmsMessage
{
    public string From { get; set; }
    public string To { get; set; }
    public string Body { get; set; }
    public DateTime ReceivedAt { get; internal set; }
    public Guid Id { get; internal set; }
    public IReadOnlyDictionary<string, string> Properties { get; set; }
}
