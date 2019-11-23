using System;
using System.Net.Http;
using System.Text;
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

        public async Task AddReceivedReceiptAsync(
            MessageReceivedReceipt readReceipt,
            CancellationToken cancellationToken)
        {
            HttpClient client = _httpClientFactory.CreateClient("Magnet");

            var request = new HttpRequestMessage(
                HttpMethod.Post,
                $"{client.BaseAddress}stream/receipt");

            request.Content = new StringContent(
                JsonConvert.SerializeObject(readReceipt),
                Encoding.UTF8,
                "application/json");

            HttpResponseMessage result = await client.SendAsync(request, default);
            result.EnsureSuccessStatusCode();
        }


        public async Task<MagnetMessage> GetNextAsync(
            string clientName,
            CancellationToken cancellationToken)
        {
            HttpClient client = _httpClientFactory.CreateClient("Magnet");
            
            var request = new HttpRequestMessage(
                HttpMethod.Get,
                $"{client.BaseAddress}stream/{clientName}");

            HttpResponseMessage result = await client.SendAsync(request, cancellationToken);
            result.EnsureSuccessStatusCode();
            string json = await result.Content.ReadAsStringAsync();
            MagnetMessage message = JsonConvert.DeserializeObject<MagnetMessage>(json);
            return message;
        }
    }
}
