using System;
using Magnet.Client.Mappers;

namespace Magnet.Client
{
    public class MessageTypeRegistration
    {
        public Type MessageType { get; set; }

        public string Name { get; set; }

        public IMessageMapper Mapper { get; set; }
    }
}
