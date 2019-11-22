using System.Collections.Generic;

namespace Magnet.Mappers
{
    public class SmsMapper : IMessageMapper<SmsMessage>
    {
        public SmsMessage FromMagetMessage(MagnetMessage magnetMessage)
        {
            var sms = new SmsMessage
            {
                From = magnetMessage.From,
                To = magnetMessage.To[0],
                ReceivedAt = magnetMessage.ReceivedAt,
                Body = magnetMessage.Body,
            };
            return sms;
        }

        public MagnetMessage ToMagnetMessage(SmsMessage message)
        {
            throw new System.NotImplementedException();
        }
    }

    public class EmailMapper : IMessageMapper<EmailMessage>
    {
        public EmailMessage FromMagetMessage(MagnetMessage magnetMessage)
        {
            var email = new EmailMessage
            {
                From = magnetMessage.From,
                To = new List<string>(magnetMessage.To),
                ReceivedAt = magnetMessage.ReceivedAt,

                Text = magnetMessage.Body,
                Html = magnetMessage.GetPropertyValue<string>("Html")
            };
            return email;
        }

        public MagnetMessage ToMagnetMessage(EmailMessage message)
        {
            var props = new Dictionary<string, object>();
            if ( message.Html != null)
                props.Add("Html", message.Html);

            var msg = new MagnetMessage
            {
                Type = "Email",
                Body = message.Text,
                ReceivedAt = message.ReceivedAt,
                From = message.From,
                Properties = props,
                To = new List<string>(message.To)
            };
            return msg;
        }
    }
}
