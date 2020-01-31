using System;
using Newtonsoft.Json.Linq;

namespace Magnet.Providers.AzureDevOps
{
    public class WorkItemEventDeserializer
    {
        internal WorkItemEvent Deserialize(string json)
        {
            var jObject = JObject.Parse(json);
            var ev = new WorkItemEvent();
            ev.CreatedDate = jObject["createdDate"].Value<DateTime>();
            ev.Id = (Guid)jObject["id"];
            ev.EventType = jObject["eventType"].Value<string>();
            ev.SubscriptionId = (Guid)jObject["subscriptionId"];
            ev.Message = jObject["message"]["text"].Value<string>();

            JToken resource = jObject["resource"];
            if (ev.EventType == "workitem.created")
            {
                ev.WorkItem = CreateWorkItem(resource);
            }
            else
            {
                ev.WorkItem = CreateWorkItem(resource["revision"]);
            }

            return ev;
        }

        private WorkItem CreateWorkItem(JToken jObject)
        {
            var wi = new WorkItem();
            wi.Id = jObject["id"].Value<int>();

            foreach (JToken field in jObject["fields"])
            {
                switch (field)
                {
                    case JProperty p:
                        wi.Fields.Add(p.Name, p.Value.ToString());
                        break;
                }
            }

            wi.Title = wi.Fields["System.Title"];
            wi.State = wi.Fields["System.State"];
            wi.AreaPath = wi.Fields["System.AreaPath"];
            wi.IterationPath = wi.Fields["System.AreaPath"];
            wi.TeamProject = wi.Fields["System.TeamProject"];
            wi.Type = wi.Fields["System.WorkItemType"];
            return wi;
        }
    }
}
