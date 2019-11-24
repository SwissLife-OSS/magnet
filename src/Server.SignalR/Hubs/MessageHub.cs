using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;

namespace Magnet.SignalR
{
    public class MessageHub : Hub
    {
        private readonly ILogger<MessageHub> _logger;
        private readonly MessageListener _messageListener;
        private readonly IMessageStore _messageStore;

        public MessageHub(
            ILogger<MessageHub> logger,
            MessageListener messageListener,
            IMessageStore messageStore)
        {
            _logger = logger;
            _messageListener = messageListener;
            _messageStore = messageStore;
        }

        public override Task OnConnectedAsync()
        {
            HttpContext httpCtx = Context.GetHttpContext();
            return Task.CompletedTask;
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            HttpContext httpCtx = Context.GetHttpContext();
            StringValues clientName = httpCtx.Request.Headers["client-name"];
            //Should somehow stop the listener here
            return base.OnDisconnectedAsync(exception);
        }

        public async Task Subscribe(string clientName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, clientName);
            _messageListener.Subsribe(clientName);
        }
    }
}
