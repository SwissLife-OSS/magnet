using Newtonsoft.Json.Linq;

namespace Magnet.GraphQL;

public static class MessageRecordExtensions
{
    public static string GetTitle(this MessageRecord record)
    {
        if (record.Type == "Sms")
        {
            return record.Body;
        }
        else if (record.Type == "Email")
        {
            var subject = record.GetPropertyValue("Subject");
            if (subject != null)
                return subject;
        }
        else if (record.Provider == "RegistrationActivationLetter")
        {
            return $"Activation Letter: {record.Body}";
        }
        else if (record.Type == "Inbox")
        {
            var obj = JObject.Parse(record.Body);
            return $"Inbox: { (string)obj["Type"]}";
        }
        else if (record.Type == "WorkItem")
        {
            return $"{record.GetPropertyValue("WorkItemId")} - {record.GetPropertyValue("System_Title")}";
        }

        return $"Unknown Type {record.Id:N}";
    }

    public static string GetPropertyValue(this MessageRecord record, string name)
    {
        if (record.Properties.ContainsKey(name))
        {
            return record.Properties[name];
        }

        return null;
    }
}
