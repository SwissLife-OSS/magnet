using System;
using System.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Magnet.Messaging.AzureServiceBus;

public static class AzureServiceBusServerBuilderExtensions
{
    public static MagnetServerBuilder AddAzureServiceBus(
       this MagnetServerBuilder builder,
       IConfiguration configuration)
    {
        AzureServiceBusOptions? azureOptions = configuration
            .GetSection("Magnet:ServiceBus")
            .Get<AzureServiceBusOptions>();

        if (azureOptions == null)
        {
            throw new ConfigurationErrorsException(
                "Magnet:ServiceBus section is missing in the configuration");
        }

        if (azureOptions.ConnectionString == null && azureOptions.Url == null)
        {
            throw new ConfigurationErrorsException(
                "ConnectionString or Url is required for Azure Service Bus.");
        }

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
