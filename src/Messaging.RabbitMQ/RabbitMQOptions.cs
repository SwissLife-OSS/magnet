using System.Collections.Generic;

namespace Magnet.Messaging.RabbitMQ;

public class RabbitMQOptions
{
    public string Hostname { get; set; } = "localhost";

    public string ExchangeName { get; set; } = "magnet_messages";


    public int MessageTtl { get; set; } = 300;
    public string UserName { get; set; }
    public string Password { get; set; }
    public int Port { get; set; } = 5672;
}
