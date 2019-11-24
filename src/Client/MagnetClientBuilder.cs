using System;
using Magnet.Client.Mappers;
using Microsoft.Extensions.DependencyInjection;

namespace Magnet.Client
{
    public class MagnetClientBuilder
    {
        private readonly IServiceCollection _services;

        public MagnetClientBuilder(IServiceCollection services)
        {
            _services = services;

        }

        public MagnetClientBuilder AddMessageType<TMessageType>(
            string name,
            IMessageMapper<TMessageType> mapper)
        {
            var typeReg = new MessageTypeRegistration
            {
                MessageType = typeof(TMessageType),
                Name = name,
                Mapper = mapper
            };
            _services.AddSingleton(typeReg);
            return this;
        }

#if (NETSTANDARD2_1)
        public MagnetClientBuilder UseGrpc(string address)
        {
            _services.AddSingleton<IMessageStreamClient>(c => new GrpcMessageStreamClient(
                new GrpcOptions { Address = address }));

            return this;
        }
#endif

        public MagnetClientBuilder UseSignalR(string endpoint)
        {
            _services.AddSingleton<IMessageStreamClient>(c => new SignalRMessageStreamClient(
                new SignalROptions { Endpoint = endpoint }, c.GetService<MagnetOptions>()));
            return this;
        }

        public MagnetClientBuilder UseHttp(string baseUrl)
        {
            _services.AddSingleton<IMessageStreamClient, HttpMessageStreamClient>();
            _services.AddHttpClient("Magnet")
                .ConfigureHttpClient(c => c.BaseAddress = new Uri(baseUrl));
            return this;
        }

        public MagnetClientBuilder WithClientName(string name)
        {
            _services.AddSingleton(new MagnetOptions
            {
                ClientName = name
            });
            return this;
        }
    }
}
