using System;
using Microsoft.Extensions.Logging;

namespace Magnet;

public static partial class LoggerExtensions
{
    [LoggerMessage(EventId = 1, Level = LogLevel.Information, Message = "New message {messageId}")]
    public static partial void NewMessage(this ILogger logger, Guid messageId);
}
