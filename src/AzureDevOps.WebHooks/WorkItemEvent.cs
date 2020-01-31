using System;

namespace Magnet.Providers.AzureDevOps
{
    public class WorkItemEvent
    {
        public string EventType { get; set; }
        public Guid SubscriptionId { get; set; }
        public Guid Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public WorkItem WorkItem { get; set; }
        public string Message { get; set; }
    }
}
