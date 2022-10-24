namespace Magnet.Client;

public class MagnetOptions
{
    public string ClientName { get; set; }

    public GrpcOptions Grpc { get; set; }

    public SignalROptions SignalR { get; set; }
}

public class GrpcOptions
{
    public string Address { get; set; }
}

public class SignalROptions
{
    public string Endpoint { get; set; }
}
