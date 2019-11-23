using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Extensions.DependencyInjection;

namespace Magnet
{
    public class MagnetServerBuilder
    {
        public IServiceCollection Services { get; }

        public MagnetServerBuilder(IServiceCollection servies)
        {
            Services = servies;
        }

        public MagnetServerBuilder SetMessageStore<TStore>()

            where TStore : class, IMessageStore
        {
            ServiceDescriptor existing = Services
                .FirstOrDefault(x => x.ServiceType == typeof(IMessageStore));
            if (existing != null)
            {
                Services.Remove(existing);
            }
            Services.AddSingleton<IMessageStore, TStore>();
            return this;
        }
    }
}
