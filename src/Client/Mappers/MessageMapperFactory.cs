using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Magnet.Client.Mappers
{
    public class MessageMapperFactory
    {
        private readonly IEnumerable<MessageTypeRegistration> _typeRegistrations;

        public MessageMapperFactory(IEnumerable<MessageTypeRegistration> typeRegistrations)
        {
            _typeRegistrations = typeRegistrations;
        }


        public string ResolveTypeName<TMessage>()
        {
            MessageTypeRegistration map = GetMap<TMessage>();
            return map.Name;
        }

        public TMessage Map<TMessage>(MagnetMessage message)
        {
            MessageTypeRegistration map = GetMap<TMessage>();
            return ((IMessageMapper<TMessage>)map.Mapper).FromMagetMessage(message);
        }

        private MessageTypeRegistration GetMap<TMessage>()
        {
            return _typeRegistrations
                .FirstOrDefault(x => x.MessageType == typeof(TMessage));
        }
    }
}
