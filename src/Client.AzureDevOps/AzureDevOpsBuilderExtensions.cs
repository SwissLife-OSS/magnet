using System;
using System.Collections.Generic;
using System.Text;
using Magnet.Client.AzureDevOps;

namespace Magnet.Client;

public static class AzureDevOpsBuilderExtensions
{
    public static MagnetClientBuilder RegisterAzureDevOps(this MagnetClientBuilder builder)
    {
        builder.AddMessageType("WorkItem", new WorkItemMessageMapper());
        return builder;
    }
}
