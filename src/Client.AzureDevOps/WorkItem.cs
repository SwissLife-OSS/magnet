using System.Collections.Generic;

namespace Magnet.Client.AzureDevOps;

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
