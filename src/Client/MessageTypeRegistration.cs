using System;
using System.Collections.Generic;
using System.Text;

namespace Magnet.Client
{
    public class MessageTypeRegistration
    {
        public Type MessageType { get; set; }

        public string Name { get; set; }

        public IMessageMapper Mapper { get; set; }
    }
}
