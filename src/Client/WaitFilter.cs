using System;
using System.Collections.Generic;
using System.Text;

namespace Magnet.Client
{
    public class WaitFilter
    {
        public Predicate<MagnetMessage> Predicate { get; set; }
    }

    public class WaitOptions
    {
        public int Timeout { get; set; }
    }
}
