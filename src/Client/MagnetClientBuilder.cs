using System;
using Magnet.Client.Mappers;
using Microsoft.Extensions.DependencyInjection;

namespace Magnet.Client;

/// <summary> 
/// The MagnetClientBuilder class is used for building a MagnetClient which is responsible for sending messages to the specified endpoints.
/// </summary>
public class MagnetClientBuilder
{
    private readonly IServiceCollection _services;

    public MagnetClientBuilder(IServiceCollection services)
    {
        _services = services;
    }

    /// <summary> 
    /// Method used for adding a new message type to the client.
    /// </summary>
    /// <typeparam name="TMessageType"> Type of the message to add. </typeparam>
    /// <param name="name"> Name of the message type. </param>
    /// <param name="mapper"> Mapper for the specified message type. </param>
    /// <returns> Self. </returns>
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

    /// <summary> 
    /// Method used for specifying that the client should use Http calls.
    /// </summary>
    /// <param name="baseUrl"> Base url where the client should send messages. </param>
    /// <param name="timeout"> timeout for the http call (default 5 minutes) </param>
    /// <returns> Self. </returns>
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

    /// <summary> 
    /// Method used for specifying the name of the Client.
    /// </summary>
    /// <param name="name"> Name of the client. </param>
    /// <returns> Self. </returns>
    public MagnetClientBuilder WithClientName(string name)
    {
        _services.AddSingleton(new MagnetOptions
        {
            ClientName = name
        });

        return this;
    }
}
