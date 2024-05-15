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
        AzureServiceBusOptions azureOptions = configuration
            .GetSection("Magnet:ServiceBus")
            .Get<AzureServiceBusOptions>()
            .Validate();
        builder.AddAzureServiceBus(azureOptions);

        return builder;
    }


    public static MagnetServerBuilder AddAzureServiceBus(
        this MagnetServerBuilder builder,
        AzureServiceBusOptions options)
    {
        builder.Services.AddSingleton(options.Validate());
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

    private static AzureServiceBusOptions Validate(this AzureServiceBusOptions? options)
    {
        if (options == null)
        {
            throw new ConfigurationErrorsException(
                "Magnet:ServiceBus section is missing in the configuration");
        }

        if (string.IsNullOrEmpty(options.ConnectionString) && string.IsNullOrEmpty(options.Url))
        {
            throw new ConfigurationErrorsException(
                "ConnectionString or Url is required for Azure Service Bus.");
        }

        return options;
    }
}
