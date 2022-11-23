using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Magnet.Providers.Twilio;

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
    public async Task<IActionResult> Sms([FromForm]TwilioSmsRequest smsRequest)
    {
        await _messageSink.ProcessMessageAsync(CreateMessage(smsRequest));
        return Ok();
    }

    private MagnetMessage CreateMessage(TwilioSmsRequest twilioSmsRequest)
    {
        var properties = new Dictionary<string, string>();
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
