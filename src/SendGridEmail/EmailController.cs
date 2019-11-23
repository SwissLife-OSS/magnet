using Magnet;
using Microsoft.AspNetCore.Mvc;
using StrongGrid;
using StrongGrid.Models.Webhooks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Magnet.Providers.SendGrid.Email
{
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
            InboundEmail inboundEmail = parser.ParseInboundEmailWebhook(Request.Body);
            await _messageSink.ProcessMessageAsync(CreateMessage(inboundEmail));
            return Ok();
        }

        private MagnetMessage CreateMessage(InboundEmail inboundEmail)
        {
            var properties = new Dictionary<string, object>();
            properties.Add("Html", inboundEmail.Html);
            properties.Add("SendGrid-Message-ID", 
                   inboundEmail.Headers
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
}
