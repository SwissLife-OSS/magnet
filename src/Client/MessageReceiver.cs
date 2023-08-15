using System;
using System.Threading;
using System.Threading.Tasks;

namespace Magnet.Client;

public sealed class MessageReceiver : IAsyncDisposable
{
    private readonly MagnetClient _magnetClient;
    private readonly string _queueName;

    internal MessageReceiver(
        MagnetClient magnetClient,
        string queueName)
    {
        _magnetClient = magnetClient;
        _queueName = queueName;
    }

    public async Task<TMessage> WaitFor<TMessage>(
        string to,
        WaitOptions options = null)
    {
        WaitFilter waitFilter = FilterBuilder.To(to).Build();
        return await WaitFor<TMessage>(waitFilter, options);
    }

    public async Task<TMessage> WaitFor<TMessage>(
        WaitFilter waitFilter = null,
        WaitOptions options = null)
    {
        options = options ?? new WaitOptions();
        var timeoutToken = new CancellationTokenSource(TimeSpan.FromSeconds(options.Timeout));
        waitFilter = waitFilter ?? new WaitFilter();
        var typeName = _magnetClient.MessageMapper.ResolveTypeName<TMessage>();
        waitFilter.Predicates.Add((m) => m.Type == typeName);

        var completion = new TaskCompletionSource<TMessage>();
        timeoutToken.Token.Register(() => completion.TrySetCanceled());

        try
        {
            while (!timeoutToken.Token.IsCancellationRequested)
            {
                MagnetMessage message = await _magnetClient.MessageStreamClient
                    .GetNextAsync(_queueName, timeoutToken.Token);

                var match = MatchFilter(waitFilter, message);
                await AddReceiveReceiptAsync(message, match, timeoutToken.Token);

                if (match)
                {
                    TMessage mapped = _magnetClient.MessageMapper.Map<TMessage>(message);
                    completion.TrySetResult(mapped);
                    break;
                }
            }
        }
        catch (Exception ex)
        {
            completion.TrySetException(ex);
        }
        finally
        {
            timeoutToken.Dispose();
        }

        return await completion.Task;
    }

    private async Task AddReceiveReceiptAsync(
        MagnetMessage message,
        bool match,
        CancellationToken cancellationToken)
    {
        try
        {
            await _magnetClient.MessageStreamClient.AddReceivedReceiptAsync(new MessageReceivedReceipt
            {
                ClientName = _magnetClient.Options.ClientName,
                IsMatch = match,
                MessageId = message.Id,
                ReceivedAt = DateTime.UtcNow
            }, cancellationToken);
        }
        catch
        {
            //dont fail...
        }
    }

    private bool MatchFilter(WaitFilter filter, MagnetMessage message)
    {
        foreach (Predicate<MagnetMessage> predicate in filter.Predicates)
        {
            try
            {
                if (!predicate(message))
                    return false;
            }
            catch
            {
                return false;
            }
        }
        return true;
    }

    public async ValueTask DisposeAsync()
    {
        using var cts = new CancellationTokenSource();
        cts.CancelAfter(TimeSpan.FromMinutes(1));

        await _magnetClient.MessageStreamClient.UnSubscribe(_queueName, cts.Token);
    }
}
