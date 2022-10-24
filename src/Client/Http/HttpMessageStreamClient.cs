using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Magnet.Client;

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
        HttpResponseMessage result = await SendRequestAsync(
            HttpMethod.Get,
            $"stream/{clientName}",
            cancellationToken);

        result.EnsureSuccessStatusCode();
        string json = await result.Content.ReadAsStringAsync();
        MagnetMessage message = JsonConvert.DeserializeObject<MagnetMessage>(json);
        return message;
    }

    public async Task<string> Subscribe(string clientName)
    {
        HttpResponseMessage result = await SendRequestAsync(
            HttpMethod.Post,
            $"stream/subscribe/{clientName}",
            default);

        result.EnsureSuccessStatusCode();
        string name = await result.Content.ReadAsStringAsync();
        return name;
    }

    public async Task UnSubscribe(string clientName)
    {
        HttpResponseMessage result = await SendRequestAsync(
                HttpMethod.Post,
                $"stream/unsubscribe/{clientName}",
                default);

        result.EnsureSuccessStatusCode();
    }

    public async Task<HttpResponseMessage> SendRequestAsync(
        HttpMethod method,
        string url,
        CancellationToken cancellationToken)
    {
        HttpClient client = _httpClientFactory.CreateClient("Magnet");

        var request = new HttpRequestMessage(
            method,
            $"{client.BaseAddress}{url}");

        HttpResponseMessage result = await client.SendAsync(request, cancellationToken);
        return result;
    }
}
