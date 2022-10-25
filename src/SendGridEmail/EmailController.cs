using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StrongGrid;
using StrongGrid.Models.Webhooks;

namespace Magnet.Providers.SendGrid;

[Route("sendgridemail")]
public class EmailController : Controller
{
    private readonly IMessageSink _messageSink;

    public EmailController(IMessageSink messageSink)
    {
        _messageSink = messageSink;
    }

    [Route("")]
    [HttpPost]
    public async Task<IActionResult> Email()
    {
        var parser = new WebhookParser();
        InboundEmail inboundEmail = await parser.ParseInboundEmailWebhookAsync(Request.Body);
        await _messageSink.ProcessMessageAsync(CreateMessage(inboundEmail));
        return Ok();
    }

    private MagnetMessage CreateMessage(InboundEmail inboundEmail)
    {
        var properties = new Dictionary<string, string>();
        properties.Add("Html", inboundEmail.Html);
        properties.Add("Subject", inboundEmail.Subject);
        properties.Add("SendGrid-Message-ID", inboundEmail.Headers
            .FirstOrDefault(x => x.Key == "Message-ID").Value);

        return new MagnetMessage
        {
            Type = "Email",
            Provider = "SendGrid",
            ReceivedAt = DateTime.UtcNow,
            From = inboundEmail.From.Email,
            To = inboundEmail.To.Select(x => x.Email).ToList(),
            Body = inboundEmail.Text,
            Properties = properties
        };
    }
}
