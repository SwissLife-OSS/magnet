using System;

namespace Magnet
{
    public static class MagnetMessageExtensions
    {
        public static string GetPropertyValue(this MagnetMessage message, string name)
        {
            return message.GetPropertyValue<string>(name);
        }

        public static T GetPropertyValue<T>(this MagnetMessage message, string name)
        {
            if (message.Properties != null && message.Properties.ContainsKey(name))
            {
                return (T) Convert
                    .ChangeType(message.Properties[name], typeof(T));
            }
            return default;
        }
    }
}
