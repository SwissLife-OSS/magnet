using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Magnet.Client
{
    public class MessageReceiver : IDisposable
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
            timeoutToken.Token.Register(() => completion.SetCanceled());

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
                        completion.SetResult(mapped);
                        timeoutToken.Dispose();
                        break;
                    }
                }
            }
            catch (Exception ex)
            {
                completion.SetException(ex);
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
                if (!predicate(message))
                    return false;
            }
            return true;
        }

        protected virtual void Dispose(bool disposing)
        {
            _magnetClient.MessageStreamClient.UnSubscribe(_queueName)
                .GetAwaiter()
                .GetResult();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
