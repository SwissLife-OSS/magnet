using System;
using System.Collections.Generic;
using System.Text;

namespace Magnet.Client.AzureDevOps;

public class WorkItemEventMessage
{
    public string EventType { get; set; }
    public Guid SubscriptionId { get; set; }
    public Guid Id { get; set; }
    public DateTime CreatedDate { get; set; }
    public WorkItem WorkItem { get; set; }
    public string Message { get; set; }
    public IReadOnlyDictionary<string, string> Properties { get; set; }
}
