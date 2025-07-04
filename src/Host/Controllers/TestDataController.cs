using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Magnet.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TestDataController : ControllerBase
{
    private readonly IMessageStore _messageStore;

    public TestDataController(IMessageStore messageStore)
    {
        _messageStore = messageStore;
    }

    [HttpPost("create-sample-messages")]
    public async Task<IActionResult> CreateSampleMessages(CancellationToken cancellationToken)
    {
        var sampleMessages = new[]
        {
            new MagnetMessage
            {
                Id = Guid.NewGuid(),
                Type = "Email",
                From = "test@example.com",
                To = new[] { "user@example.com" },
                Body = "This is a test email message",
                ReceivedAt = DateTime.UtcNow,
                Provider = "SendGrid",
                Properties = new Dictionary<string, string>
                {
                    ["Subject"] = "Test Email"
                }
            },
            new MagnetMessage
            {
                Id = Guid.NewGuid(),
                Type = "SMS",
                From = "+1234567890",
                To = new[] { "+0987654321" },
                Body = "This is a test SMS message",
                ReceivedAt = DateTime.UtcNow.AddMinutes(-5),
                Provider = "Twilio",
                Properties = new Dictionary<string, string>()
            },
            new MagnetMessage
            {
                Id = Guid.NewGuid(),
                Type = "Email",
                From = "admin@company.com",
                To = new[] { "employee@company.com" },
                Body = "Welcome to our company!",
                ReceivedAt = DateTime.UtcNow.AddHours(-1),
                Provider = "SendGrid",
                Properties = new Dictionary<string, string>
                {
                    ["Subject"] = "Welcome Email"
                }
            }
        };

        foreach (var message in sampleMessages)
        {
            await _messageStore.AddAsync(message, cancellationToken);
        }

        return Ok($"Created {sampleMessages.Length} sample messages");
    }

    [HttpGet("count")]
    public async Task<IActionResult> GetMessageCount(CancellationToken cancellationToken)
    {
        var messages = await _messageStore.GetAllAsync(cancellationToken);
        return Ok(new { Count = messages.Count, Messages = messages });
    }
}
