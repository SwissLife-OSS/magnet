using Magnet.Client.Mappers;
using Newtonsoft.Json;

namespace Magnet.Client.AzureDevOps;

public class WorkItemMessageMapper : IMessageMapper<WorkItemEventMessage>
{
    public WorkItemEventMessage FromMagetMessage(MagnetMessage magnetMessage)
    {
        WorkItemEventMessage msg = JsonConvert.DeserializeObject<WorkItemEventMessage>(
            magnetMessage.GetPropertyValue("Json"));
        return msg;
    }
}
