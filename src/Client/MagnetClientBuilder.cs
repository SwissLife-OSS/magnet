using System;
using Magnet.Client.Mappers;
using Microsoft.Extensions.DependencyInjection;

namespace Magnet.Client;

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

    public MagnetClientBuilder UseHttp(string baseUrl, TimeSpan? timeout = default)
    {
        _services.AddSingleton<IMessageStreamClient, HttpMessageStreamClient>();
        _services.AddHttpClient("Magnet")
            .ConfigureHttpClient(c =>
            {
                c.BaseAddress = new Uri(baseUrl);
                c.Timeout = timeout ?? TimeSpan.FromMinutes(5);
            });
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
