using System;

namespace Magnet.Client
{
    public class MagnetConfigurationException : Exception
    {
        public MagnetConfigurationException(string message)
            : base(message)
        {
        }
    }
}
