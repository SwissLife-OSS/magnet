using Microsoft.AspNetCore.SignalR;

namespace Magnet.SignalR
{
    public class MessageListener
    {
        private readonly IHubContext<MessageHub> _hubContext;
        private readonly IMessageBus _messageBus;

        public MessageListener(IHubContext<MessageHub> hubContext, IMessageBus messageBus)
        {
            _hubContext = hubContext;
            _messageBus = messageBus;
        }

        public void Subsribe(string clientName)
        {
            _messageBus.RegisterMessageHandler(clientName, async (msg, token) =>
            {
                await _hubContext.Clients.Group(clientName).SendAsync("newMessage", msg, token);
            });
        }
    }
}
