using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Magnet.Providers.Twilio.Sms
{
    [Route("message")]
    public class MessageController : Controller
    {
        private readonly IMessageSink _messageSink;

        public MessageController(IMessageSink messageSink)
        {
            _messageSink = messageSink;
        }

        [Route("")]
        [HttpPost]
        public async Task<IActionResult> New([FromBody] MagnetMessage message)
        {
            await _messageSink.ProcessMessageAsync(message);
            return Ok();
        }
    }
}
