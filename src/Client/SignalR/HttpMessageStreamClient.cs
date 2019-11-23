using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Magnet.Client
{
    public class HttpMessageStreamClient : IMessageStreamClient
    {
        private readonly MagnetOptions _magnetOptions;
        private readonly IHttpClientFactory _httpClientFactory;

        public HttpMessageStreamClient(
            MagnetOptions magnetOptions,
            IHttpClientFactory httpClientFactory)
        {
            _magnetOptions = magnetOptions;
            _httpClientFactory = httpClientFactory;
        }

        public Task AddReadReceiptAsync(MessageReceivedReceipt readReceipt)
        {
            return Task.CompletedTask;
        }

        public Task RegisterMessageReceivedHandler(string clientName, Action<MagnetMessage> handler)
        {
            throw new NotImplementedException();
        }

        public Task UnSubscribe(string clientName, string token)
        {
            throw new NotImplementedException();
        }

        public async Task<MagnetMessage> GetNextAsync(
            string clientName,
            CancellationToken cancellationToken)
        {
            HttpClient client = _httpClientFactory.CreateClient("Magnet");
            var reqeust = new HttpRequestMessage(
                HttpMethod.Get,
                $"{client.BaseAddress}stream/{clientName}");

            HttpResponseMessage result = await client.SendAsync(reqeust, cancellationToken);
            string json = await result.Content.ReadAsStringAsync();
            MagnetMessage message = JsonConvert.DeserializeObject<MagnetMessage>(json);
            return message;
        }
    }
}
