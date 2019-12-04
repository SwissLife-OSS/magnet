using System;
using System.Collections.Generic;
using System.Text;

namespace Magnet.Client
{
    public class MagnetClientException : Exception
    {
        public MagnetClientException(string message) : base(message)
        {
        }
    }
}
