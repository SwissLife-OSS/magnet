using System;
using System.Collections.Generic;

namespace Magnet.Client
{
    public class FilterBuilder
    {
        private List<Predicate<MagnetMessage>> _predicates
            = new List<Predicate<MagnetMessage>>();

        public static FilterBuilder To(string to)
        {
            return new FilterBuilder()
                        .WithTo(to);
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
}
