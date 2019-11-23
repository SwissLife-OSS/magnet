using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR.Client;

namespace Magnet.Client
{

    public class SignalRMessageStreamClient : IMessageStreamClient
    {
        private readonly SignalROptions _options;
        private readonly MagnetOptions _magnetOptions;
        private readonly HubConnection _connection;

        public SignalRMessageStreamClient(SignalROptions options, MagnetOptions magnetOptions)
        {
            _options = options;
            _magnetOptions = magnetOptions;

            _connection = new HubConnectionBuilder()
                .WithUrl($"{_options.Endpoint.Trim('/')}/messagehub", options =>
                {
                    options.AccessTokenProvider = () => Task.FromResult("bla");
                    options.Headers["client-name"] = _magnetOptions.ClientName;
                })
                .WithAutomaticReconnect()
                .Build();
        }

        public Task AddReadReceiptAsync(MessageReceivedReceipt readReceipt)
        {
            return Task.CompletedTask;
        }

        public Task<MagnetMessage> GetNextAsync(string clientName, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task RegisterMessageReceivedHandler(string clientName, Action<MagnetMessage> handler)
        {
            await _connection.StartAsync();
            await _connection.InvokeAsync("Subscribe", clientName);

            _connection.On<MagnetMessage>("newMessage", (message) =>
            {
                handler(message);
            });
        }


        public async Task UnSubscribe(string clientName, string token)
        {
            await _connection.InvokeAsync("UnSubscribe", clientName, token);
            await _connection.StopAsync();
        }
    }
}
