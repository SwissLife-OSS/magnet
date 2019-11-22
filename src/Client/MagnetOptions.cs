using System;
using System.Collections.Generic;
using System.Text;

namespace Magnet.Client
{
    public class MagnetOptions
    {
        public string ClientName { get; set; }

        public GrpcOptions Grpc { get; set; }
    }

    public class GrpcOptions
    {
        public string Address { get; set; }
    }
}
