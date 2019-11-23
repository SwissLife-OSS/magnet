using System;
using System.Threading;
using System.Threading.Tasks;
using Magnet.Client.Mappers;

namespace Magnet.Client
{

    public class MagnetClient
    {
        private readonly MessageMapperFactory _messageMapper;
        private readonly IMessageStreamClient _messageStreamClient;
        private readonly MagnetOptions _options;

        public MagnetClient(
            MessageMapperFactory messageMapper,
            IMessageStreamClient messageStreamClient,
            MagnetOptions options)
        {
            _messageMapper = messageMapper;
            _messageStreamClient = messageStreamClient;
            _options = options;
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
            var typeName = _messageMapper.ResolveTypeName<TMessage>();
            waitFilter.Predicates.Add((m) => m.Type == typeName);

            var completion = new TaskCompletionSource<TMessage>();
            timeoutToken.Token.Register(() => completion.SetCanceled());

            try
            {
                MagnetMessage message = await _messageStreamClient
                    .GetNextAsync(_options.ClientName, timeoutToken.Token);

                var match = MatchFilter(waitFilter, message);
                await AddReceiveReceiptAsync(message, match, timeoutToken.Token);

                if (match)
                {
                    TMessage mapped = _messageMapper.Map<TMessage>(message);
                    completion.SetResult(mapped);
                    timeoutToken.Dispose();
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
                await _messageStreamClient.AddReceivedReceiptAsync(new MessageReceivedReceipt
                {
                    ClientName = _options.ClientName,
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
    }
}
