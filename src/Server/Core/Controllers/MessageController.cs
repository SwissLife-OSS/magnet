using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Magnet.Providers.Twilio.Sms;

[Route("message")]
public class MessageController : Controller
{
    private readonly IMessageSink _messageSink;

    public MessageController(IMessageSink messageSink)
    {
        _messageSink = messageSink;
    }

    [Route("")]
    [Route("new")]
    [HttpPost]
    public async Task<IActionResult> New([FromBody] MagnetMessage message)
    {
        await _messageSink.ProcessMessageAsync(message);
        return Ok();
    }
}
