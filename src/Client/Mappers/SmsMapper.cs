namespace Magnet.Client.Mappers
{
    public class SmsMapper : IMessageMapper<SmsMessage>
    {
        public SmsMessage FromMagetMessage(MagnetMessage magnetMessage)
        {
            var sms = new SmsMessage
            {
                Id = magnetMessage.Id,
                From = magnetMessage.From,
                To = magnetMessage.To[0],
                ReceivedAt = magnetMessage.ReceivedAt,
                Body = magnetMessage.Body,
            };
            return sms;
        }
    }
}
