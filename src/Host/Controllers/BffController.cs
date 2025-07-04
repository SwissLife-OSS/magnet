using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace Magnet.Server.Controllers;

[Route("bff")]
[ApiController]
public class BffController : ControllerBase
{
    [HttpGet("user")]
    public IActionResult GetUser()
    {
        var claims = HttpContext.User.Claims.Select(c => new
        {
            type = c.Type,
            value = c.Value
        }).ToList();

        return Ok(claims);
    }
}
