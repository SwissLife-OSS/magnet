using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace Magnet.Client.Mappers
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

        public static IDictionary<string, string> GetPropertiesFiltered(this MagnetMessage message, params string[] excludeNames)
        {
            return message.Properties.Where(x => !excludeNames.Contains(x.Key))
                .ToDictionary(k => k.Key, k => k.Value);
        }
    }
}
