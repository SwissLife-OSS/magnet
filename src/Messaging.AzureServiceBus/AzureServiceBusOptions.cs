using System;
using Azure.Messaging.ServiceBus;

namespace Magnet.Messaging.AzureServiceBus;

public class AzureServiceBusOptions
{
    public string? ConnectionString { get; set; }
    public string? Url { get; set; }
    public string Topic { get; set; } = "magnet";
    public ServiceBusTransportType TransportType { get; set; } = ServiceBusTransportType.AmqpTcp;
    public TimeSpan ReceiveTimeout { get; set; } = TimeSpan.FromMinutes(5);
}
