using System;
using System.Collections.Generic;
using System.Text;

namespace Magnet.Messaging.AzureServiceBus
{
    public class AzureServiceBusOptions
    {
        public string ConnectionString { get; set; }

        public string Topic { get; set; }

    }
}
