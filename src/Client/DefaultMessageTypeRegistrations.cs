

using Magnet.Client.Mappers;

namespace Magnet.Client
{
    public static class DefaultMessageTypeRegistrations
    {
        public static readonly MessageTypeRegistration Email =
             new MessageTypeRegistration
            {
                Name = "Email",
                MessageType = typeof(EmailMessage),
                Mapper = new EmailMapper()
            };

        public static readonly MessageTypeRegistration Sms =
             new MessageTypeRegistration
             {
                 Name = "Sms",
                 MessageType = typeof(SmsMessage),
                 Mapper = new SmsMapper()
             };

    }
}
