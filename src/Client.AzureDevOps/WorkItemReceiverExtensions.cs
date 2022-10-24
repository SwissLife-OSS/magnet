using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Magnet.Client.AzureDevOps;

public static class WorkItemReceiverExtensions
{
    public static async Task<WorkItemEventMessage> WaitForWorkItemUpdatedEvent(
        this MessageReceiver client,
        WaitOptions options = null)
    {
        WaitFilter filter = WorkItemUpdatedFilter
            .Build();

        return await client.WaitFor<WorkItemEventMessage>(filter, options);
    }

    public static async Task<WorkItemEventMessage> WaitForWorkItemUpdatedEvent(
        this MessageReceiver client,
        int workItemId,
        WaitOptions options = null)
    {
        WaitFilter filter = WorkItemUpdatedFilter
            .WithProperty("WorkItemId", workItemId.ToString())
            .Build();

        return await client.WaitFor<WorkItemEventMessage>(filter, options);
    }

    public static async Task<WorkItemEventMessage> WaitForWorkItemCreatedEvent(
        this MessageReceiver client,
        WaitOptions options = null)
    {
        WaitFilter filter = WorkItemCreatedFilter
            .Build();
        return await client.WaitFor<WorkItemEventMessage>(filter, options);
    }

    public static async Task<WorkItemEventMessage> WaitForWorkItemCreatedEvent(
        this MessageReceiver client,
        string title,
        WaitOptions options = null)
    {
        WaitFilter filter = WorkItemCreatedFilter
            .WithProperty("System_Title", title)
            .Build();
        return await client.WaitFor<WorkItemEventMessage>(filter, options);
    }

    private static FilterBuilder WorkItemUpdatedFilter => FilterBuilder.New()
            .WithProperty("EventType", "workitem.updated");

    private static FilterBuilder WorkItemCreatedFilter => FilterBuilder.New()
            .WithProperty("EventType", "workitem.created");
}
