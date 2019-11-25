using System;
using System.Collections.Generic;
using System.Text;

namespace Magnet
{
    public class MagnetMessage
    {
        public MagnetMessage()
        {
        }

        public Guid Id { get; set; }

        public string Type { get; set; }

        public DateTime ReceivedAt { get; set; }

        public string From { get; set; }

        public IList<string> To { get; set; }

        public string Body { get; set; }

        public IReadOnlyDictionary<string, string> Properties { get; set; }
        public string Provider { get; set; }
    }

    public class MessageBuilder
    {
        private MagnetMessage _message = new MagnetMessage();
        private Dictionary<string, string> _properties = new Dictionary<string, string>();
        private HashSet<string> _to = new HashSet<string>();

        public MagnetMessage Build()
        {
            _message.To = new List<string>(_to);
            _message.Properties = _properties;
            return _message;
        }

        public static MessageBuilder New(string type, string provider)
        {
            return new MessageBuilder(type, provider);
        }

        private MessageBuilder()
        {

        }

        private MessageBuilder(string type, string provider)
        {
            _message.Type = type;
            _message.Provider = provider;
        }

        public MessageBuilder AddTo(string to)
        {
            _to.Add(to);
            return this;
        }

        public MessageBuilder WithBody(string body)
        {
            _message.Body = body;
            return this;
        }
    }
}
