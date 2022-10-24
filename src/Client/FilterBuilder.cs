using System;
using System.Collections.Generic;
using Magnet.Client.Mappers;

namespace Magnet.Client;

public class FilterBuilder
{
    private List<Predicate<MagnetMessage>> _predicates
        = new List<Predicate<MagnetMessage>>();

    public static FilterBuilder To(string to)
    {
        return new FilterBuilder()
                    .WithTo(to);
    }

    public static FilterBuilder New()
    {
        return new FilterBuilder();
    }

    public FilterBuilder WithTo(string to)
    {
        _predicates.Add((msg) => msg.To.Contains(to));
        return this;
    }

    public FilterBuilder WithFrom(string from)
    {
        _predicates.Add((msg) => msg.From.Equals(from));
        return this;
    }

    public FilterBuilder WithContainsProperty(string name)
    {
        _predicates.Add(x => x.Properties.ContainsKey(name));
        return this;
    }

    public FilterBuilder WithProperty(string name, string value)
    {
        _predicates.Add(x =>
        {
            var value = x.GetPropertyValue<string>(name);
            if (value != null)
                return value.Equals(value, StringComparison.OrdinalIgnoreCase);
            return false;
        });
        return this;
    }

    public FilterBuilder With(Predicate<MagnetMessage> predicate)
    {
        _predicates.Add(predicate);
        return this;
    }

    public WaitFilter Build()
    {
        return new WaitFilter
        {
            Predicates = _predicates
        };
    }
}
