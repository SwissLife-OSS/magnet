using System.Collections.Generic;
using Magnet.Client;

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
                Html = magnetMessage.GetPropertyValue<string>("Html")
            };
            return email;
        }

        //public MagnetMessage ToMagnetMessage(EmailMessage message)
        //{
        //    var props = new Dictionary<string, object>();
        //    if ( message.Html != null)
        //        props.Add("Html", message.Html);

        //    var msg = new MagnetMessage
        //    {
        //        Type = "Email",
        //        Body = message.Text,
        //        ReceivedAt = message.ReceivedAt,
        //        From = message.From,
        //        Properties = props,
        //        To = new List<string>(message.To)
        //    };
        //    return msg;
        //}

    }
}
