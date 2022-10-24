using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Magnet.Providers.AzureDevOps;

[Route("ado")]
public class WorkItemController : Controller
{
    private readonly IMessageSink _messageSink;
    private readonly WorkItemEventDeserializer _deserializer;

    public WorkItemController(
        IMessageSink messageSink,
        WorkItemEventDeserializer deserializer)
    {
        _messageSink = messageSink;
        _deserializer = deserializer;
    }


    [Route("workitem")]
    [HttpPost]
    public async Task<IActionResult> Hook()
    {
        using var reader = new StreamReader(Request.Body);
        string json = reader.ReadToEnd();

        WorkItemEvent workItemEvent = _deserializer.Deserialize(json);
        MagnetMessage message = BuildMessage(workItemEvent);

        await _messageSink.ProcessMessageAsync(message);
        return Ok();
    }

    private MagnetMessage BuildMessage(WorkItemEvent workItemEvent)
    {
        var props = new Dictionary<string, string>();
        foreach (KeyValuePair<string, string> field in workItemEvent.WorkItem.Fields)
        {
            props.Add(field.Key.Replace(".", "_"), field.Value);
        }
        props.Add("WorkItemId", workItemEvent.WorkItem.Id.ToString());
        props.Add("EventType", workItemEvent.EventType);
        props.Add("Json", JsonConvert.SerializeObject(workItemEvent));

        return new MagnetMessage
        {
            Id = workItemEvent.Id,
            From = $"{workItemEvent.WorkItem.TeamProject}/{workItemEvent.WorkItem.Id}",
            Provider = "AzureDevOps",
            Type = "WorkItem",
            Body = workItemEvent.Message,
            ReceivedAt = workItemEvent.CreatedDate,
            Properties = props,
            To = new List<string>() { "Broadcast" }
        };
    }
}
