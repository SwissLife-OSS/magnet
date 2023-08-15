using System;
using Microsoft.Extensions.Logging;

namespace Magnet.Messaging.AzureServiceBus;

public static partial class LoggerExtensions
{
    [LoggerMessage(EventId = 1, Level = LogLevel.Information, Message = "Begin read next message for {clientName}")]
    public static partial void BeginReadNextMessage(this ILogger logger, string clientName);

    [LoggerMessage(EventId = 2, Level = LogLevel.Error, Message = "Failed read next message for {clientName}")]
    public static partial void FailedReadMessage(this ILogger logger, Exception ex, string clientName);

    [LoggerMessage(EventId = 3, Level = LogLevel.Error, Message = "Failed creating subscription for {clientName}")]
    public static partial void FailedCreatingSubscription(this ILogger logger, Exception ex, string clientName);

    [LoggerMessage(EventId = 4, Level = LogLevel.Error, Message = "Failed receiving message for {handlerName}")]
    public static partial void FailedReceivingMessage(this ILogger logger, Exception ex, string handlerName);
}
