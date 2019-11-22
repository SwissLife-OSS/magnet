using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Magnet.Providers.Twilio.Sms
{
    [Route("twiliosms")]
    public class SmsController : Controller
    {
        private readonly IMessageSink _messageSink;

        public SmsController(IMessageSink messageSink)
        {
            _messageSink = messageSink;
        }


        [Route("")]
        [HttpPost]
        public async Task<IActionResult> Sms(TwilioSmsRequest smsRequest)
        {
            await _messageSink.ProcessMessageAsync(CreateMessage(smsRequest));
            return Ok();
        }

        private MagnetMessage CreateMessage(TwilioSmsRequest twilioSmsRequest)
        {
            var properties = new Dictionary<string, object>();
            properties.Add("Twilio-Message-ID", twilioSmsRequest.SmsSid);

            return new MagnetMessage
            {
                Type = "Sms",
                Provider = "Twilio",
                ReceivedAt = DateTime.UtcNow,
                From = twilioSmsRequest.From,
                To = new List<string> { twilioSmsRequest.To },
                Body = twilioSmsRequest.Body,
                Properties = properties,
            };
        }
    }
}
