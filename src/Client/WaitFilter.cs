using System;
using System.Collections.Generic;
using Magnet;

/// <summary>
/// Represents a filter that waits for specified conditions to be met before processing a Magnet message.
/// This filter contains a list of predicates that need to be satisfied in order for processing to occur.
/// </summary>
public class WaitFilter
{
    /// <summary>
    /// Gets or sets a list of predicates that must be satisfied for the Magnet message to be processed.
    /// </summary>
    public List<Predicate<MagnetMessage>> Predicates { get; set; }
        = new List<Predicate<MagnetMessage>>();
}

/// <summary>
/// Represents options for a Magnet client to wait for conditions to be met before processing a message.
/// </summary>
public class WaitOptions
{
    /// <summary>
    /// Gets or sets the maximum amount of time to wait before abandoning the wait operation.
    /// By default, this is set to 5 minutes.
    /// </summary>
    public TimeSpan Timeout { get; set; } = TimeSpan.FromMinutes(5);
}
