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

    public Task AddReceivedReceiptAsync(
        MessageReceivedReceipt readReceipt,
        CancellationToken cancellationToken)
    {
        var content = new StringContent(
            JsonConvert.SerializeObject(readReceipt),
            Encoding.UTF8,
            "application/json");

        return SendRequestAsync(HttpMethod.Post, "stream/receipt", content, cancellationToken);
    }

    public async Task<MagnetMessage> GetNextAsync(
        string clientName,
        CancellationToken cancellationToken)
    {
        HttpResponseMessage result = await SendRequestAsync(
            HttpMethod.Get,
            $"stream/{clientName}",
            cancellationToken);

        var json = await result.Content.ReadAsStringAsync(cancellationToken);
        MagnetMessage message = JsonConvert.DeserializeObject<MagnetMessage>(json);
        return message;
    }

    public async Task<string> Subscribe(
        string clientName,
        CancellationToken cancellationToken)
    {
        HttpResponseMessage result = await SendRequestAsync(
            HttpMethod.Post,
            $"stream/subscribe/{clientName}",
            cancellationToken);

        return await result.Content.ReadAsStringAsync(cancellationToken);
    }

    public Task UnSubscribe(
        string clientName,
        CancellationToken cancellationToken)
    {
        return SendRequestAsync(
            HttpMethod.Post,
            $"stream/unsubscribe/{clientName}",
            cancellationToken);
    }

    public Task<HttpResponseMessage> SendRequestAsync(
        HttpMethod method,
        string url,
        CancellationToken cancellationToken) =>
        SendRequestAsync(method, url, null, cancellationToken);

    public async Task<HttpResponseMessage> SendRequestAsync(
        HttpMethod method,
        string url,
        HttpContent content,
        CancellationToken cancellationToken)
    {
        HttpClient client = _httpClientFactory.CreateClient("Magnet");

        var request = new HttpRequestMessage(method, $"{client.BaseAddress}{url}")
        {
            Content = content
        };

        HttpResponseMessage result = await client.SendAsync(request, cancellationToken);
        result.EnsureSuccessStatusCode();

        return result;
    }
}
