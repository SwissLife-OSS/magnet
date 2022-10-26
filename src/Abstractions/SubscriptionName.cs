using System;

namespace Magnet;

public static class SubscriptionName
{
    public static string Create(string baseName)
    {
        return $"{baseName}-{DateTime.UtcNow.Ticks}";
    }
}
