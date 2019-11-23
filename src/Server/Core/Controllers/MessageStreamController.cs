using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Magnet.Controllers
{
    [Route("stream")]
    public class MessageStreamController : Controller
    {
        private readonly IMessageBus _messageBus;

        public MessageStreamController(IMessageBus messageBus)
        {
            _messageBus = messageBus;
        }

        [Route("{clientName}")]
        [HttpGet]
        public async Task<IActionResult> GetNext(string clientName, CancellationToken cancellationToken)
        {
            MagnetMessage msg = await _messageBus.GetNextAsync(clientName);
            return Ok(msg);
        }
    }
}
