using System;
using System.Collections.Generic;

namespace Magnet;

public class MessageBuilder
{
    private MagnetMessage _message = new MagnetMessage();
    private Dictionary<string, string> _properties = new Dictionary<string, string>();
    private HashSet<string> _to = new HashSet<string>();

    public MagnetMessage Build()
    {
        _message.Id = Guid.NewGuid();
        _message.ReceivedAt = DateTime.UtcNow;
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

    public MessageBuilder WithFrom(string from)
    {
        _message.From = from;
        return this;
    }

    public MessageBuilder WithBody(string body)
    {
        _message.Body = body;
        return this;
    }

    public MessageBuilder AddProperty(string name, string value)
    {
        _properties.Add(name, value);
        return this;
    }
}
