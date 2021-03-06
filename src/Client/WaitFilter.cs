using System;
using System.Collections.Generic;

namespace Magnet.Client
{
    public class WaitFilter
    {
        public List<Predicate<MagnetMessage>> Predicates { get; set; }
            = new List<Predicate<MagnetMessage>>();
    }

    public class WaitOptions
    {
        public int Timeout { get; set; } = 60;
    }
}
