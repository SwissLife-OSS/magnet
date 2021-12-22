using System.Collections.Generic;

namespace Magnet.Client.Mappers
{
    public class EmailMapper : IMessageMapper<EmailMessage>
    {
        public EmailMessage FromMagetMessage(MagnetMessage magnetMessage)
        {
            var email = new EmailMessage
            {
                Id = magnetMessage.Id,
                From = magnetMessage.From,
                To = new List<string>(magnetMessage.To),
                ReceivedAt = magnetMessage.ReceivedAt,
                Text = magnetMessage.Body,
                Html = magnetMessage.GetPropertyValue<string>("Html"),
                Subject = magnetMessage.GetPropertyValue<string>("Subject"),
                Properties = new Dictionary<string, string>(
                    magnetMessage.GetPropertiesFiltered("Html", "Subject"))
            };
            return email;
        }
    }
}
