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
            options = options ?? new WaitOptions { Timeout = 120 };
            var timeoutToken = new CancellationTokenSource(TimeSpan.FromSeconds(options.Timeout));
            waitFilter = waitFilter ?? new WaitFilter();
            var typeName = _messageMapper.ResolveTypeName<TMessage>();
            waitFilter.Predicates.Add((m) => m.Type == typeName);

            var completion = new TaskCompletionSource<TMessage>();
            timeoutToken.Token.Register(() => completion.SetCanceled());

            try
            {
                MagnetMessage message = await _messageStreamClient
                    .GetNextAsync(_options.ClientName, default);

                var match = MatchFilter(waitFilter, message);

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
            }

            return await completion.Task;
        }



        public async Task<TMessage> WaitFor2<TMessage>(
        WaitFilter waitFilter = null,
        WaitOptions options = null)
        {
            options = options ?? new WaitOptions { Timeout = 120 };
            var timeoutToken = new CancellationTokenSource(TimeSpan.FromSeconds(options.Timeout));
            waitFilter = waitFilter ?? new WaitFilter();
            var typeName = _messageMapper.ResolveTypeName<TMessage>();
            waitFilter.Predicates.Add((m) => m.Type == typeName);

            var completion = new TaskCompletionSource<TMessage>();
            timeoutToken.Token.Register(() => completion.SetCanceled());

            try
            {
                await _messageStreamClient.RegisterMessageReceivedHandler(_options.ClientName, (msg) =>
                {
                    var match = MatchFilter(waitFilter, msg);
                    _messageStreamClient.AddReadReceiptAsync(new MessageReceivedReceipt
                    {
                        MessageId = msg.Id,
                        IsMatch = match,
                        ClientName = _options.ClientName,
                        ReceivedAt = DateTime.UtcNow
                    });

                    if (match)
                    {
                        TMessage mapped = _messageMapper.Map<TMessage>(msg);
                        completion.SetResult(mapped);
                        timeoutToken.Dispose();
                        _messageStreamClient.UnSubscribe(_options.ClientName, "");
                    }
                });
            }
            catch (Exception ex)
            {
                completion.SetException(ex);
            }

            return await completion.Task;
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
