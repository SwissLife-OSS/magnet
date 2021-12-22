using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Magnet.Messaging.AzureServiceBus;

public static class AzureServiceBusServerBuilderExtensions
{
    public static MagnetServerBuilder AddAzureServiceBus(
       this MagnetServerBuilder builder,
       IConfiguration configuration)
    {
        IConfigurationSection section = configuration.GetSection("Magnet:ServiceBus");
        AzureServiceBusOptions azureOptions = section.Get<AzureServiceBusOptions>();
        builder.AddAzureServiceBus(azureOptions);
        return builder;
    }


    public static MagnetServerBuilder AddAzureServiceBus(
        this MagnetServerBuilder builder,
        AzureServiceBusOptions options)
    {
        builder.Services.AddSingleton(options);
        builder.Services.AddSingleton<IMessageBus, MessageBus>();
        return builder;
    }


    public static MagnetServerBuilder AddAzureServiceBus(
        this MagnetServerBuilder builder,
        Action<AzureServiceBusOptions> setup)
    {
        var options = new AzureServiceBusOptions();
        setup.Invoke(options);
        return builder.AddAzureServiceBus(options);
    }

}
