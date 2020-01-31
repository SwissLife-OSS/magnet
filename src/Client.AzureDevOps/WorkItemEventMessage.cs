using System;
using System.Collections.Generic;
using System.Text;

namespace Magnet.Client.AzureDevOps
{
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

    public class WorkItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string State { get; set; }
        public string Type { get; set; }
        public string AreaPath { get; set; }
        public string IterationPath { get; set; }
        public string TeamProject { get; set; }
        public IReadOnlyDictionary<string, string> Fields { get; set; }
            = new Dictionary<string, string>();
    }
}
