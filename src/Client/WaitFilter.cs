using System;
using System.Collections.Generic;
using System.Text;

namespace Magnet.Client
{
    public class WaitFilter
    {
        public List<Predicate<MagnetMessage>> Predicates { get; set; }
            = new List<Predicate<MagnetMessage>>();
    }


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

    public class WaitOptions
    {
        public int Timeout { get; set; }
    }
}
