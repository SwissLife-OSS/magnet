using System;

namespace Magnet.Messaging.AzureServiceBus;

public class AzureServiceBusOptions
{
    public string ConnectionString { get; set; }

    public string Topic { get; set; }

    public TimeSpan ReceiveTimeout { get; set; } = TimeSpan.FromMinutes(5);
}
