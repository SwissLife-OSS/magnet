using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Magnet.Controllers
{
    [Route("stream")]
    public class MessageStreamController : Controller
    {
        private readonly IMessageBus _messageBus;
        private readonly IMessageStore _store;

        public MessageStreamController(IMessageBus messageBus, IMessageStore store)
        {
            _messageBus = messageBus;
            _store = store;
        }

        [Route("{clientName}")]
        [HttpGet]
        public async Task<IActionResult> GetNext(string clientName, CancellationToken cancellationToken)
        {
            MagnetMessage msg = await _messageBus.GetNextAsync(clientName, cancellationToken);
            return Ok(msg);
        }

        [Route("receipt")]
        [HttpPost]
        public async Task<ActionResult> AddReceivedReceipt(
            [FromBody]MessageReceivedReceipt receipt,
            CancellationToken cancellationToken)
        {
            await _store.AddReadReceiptAsync(receipt, cancellationToken);
            return Ok();
        }
    }
}
