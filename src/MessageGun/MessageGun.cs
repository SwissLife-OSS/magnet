using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Magnet;

public class MessageGun : IMessageGun
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly MessageGunOptions _options;

    public MessageGun(
        IHttpClientFactory httpClientFactory,
        MessageGunOptions options)
    {
        _httpClientFactory = httpClientFactory;
        _options = options;
    }

    public async Task TriggerAsync(
        MessageBuilder builder,
        CancellationToken cancellationToken)
    {
        HttpClient client = _httpClientFactory.CreateClient(_options.HttpClientName);
        var request = new HttpRequestMessage(
            HttpMethod.Post,
            $"{client.BaseAddress.ToString().Trim('/')}/message");

        MagnetMessage message = builder.Build();

        request.Content = new StringContent(
            JsonConvert.SerializeObject(message),
            Encoding.UTF8,
            "application/json");

        HttpResponseMessage result = await client.SendAsync(request, cancellationToken);
        result.EnsureSuccessStatusCode();
    }
}
