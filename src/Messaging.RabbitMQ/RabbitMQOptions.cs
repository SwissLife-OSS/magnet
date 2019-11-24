using System.Collections.Generic;

namespace Magnet.Messaging.RabbitMQ
{
    public class RabbitMQOptions
    {
        public string Hostname { get; set; } = "localhost";

        public string ExchangeName { get; set; } = "magnet_messages";

        public List<string> ConsumerQueues { get; set; } = new List<string>() { "a", "b", "store" };
        public object MessageTtl { get; set; } = 300;
        public string UserName { get;  set; }
        public string Password { get;  set; }
        public int Port { get; set; } = 5672;
    }
}
