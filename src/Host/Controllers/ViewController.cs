using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Magnet.Server.Controllers;

[Route("view")]
[ApiController]
public class ViewController : ControllerBase
{
    private readonly IMessageStore _messageStore;

    public ViewController(IMessageStore messageStore)
    {
        _messageStore = messageStore;
    }

    [Route("content/{id}")]
    public async Task<IActionResult> Content(Guid id, CancellationToken cancellationToken)
    {
        MessageRecord message = await _messageStore.GetById(id, cancellationToken);
        var html = message.Body;

        if (string.IsNullOrEmpty(html))
        {
            html = message.GetPropertyValue<string>("Html");
        }
        return Content(html, "text/html");
    }
}
