using System;

namespace Magnet.Client;

public class MagnetClientException : Exception
{
    public MagnetClientException(string message) : base(message)
    {
    }
}
