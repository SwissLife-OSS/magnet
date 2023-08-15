using System;
using Microsoft.Extensions.Logging;

namespace Magnet.Store.Mongo;

public static partial class LoggerExtensions
{
    [LoggerMessage(EventId = 1, Level = LogLevel.Information, Message = "Add message to store {messageId}")]
    public static partial void AddMessage(this ILogger logger, Guid messageId);

    [LoggerMessage(EventId = 2, Level = LogLevel.Error, Message = "Failed to add message to store")]
    public static partial void FailAddMessage(this ILogger logger, Exception ex);

    [LoggerMessage(EventId = 3, Level = LogLevel.Information, Message = "Add ReadReceipt to store {messageId} from {clientName}")]
    public static partial void AddReadReceipt(this ILogger logger, Guid messageId, string clientName);
}
