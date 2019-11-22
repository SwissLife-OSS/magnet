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
            var timeoutToken = new CancellationTokenSource(TimeSpan.FromSeconds(options.Timeout));
            waitFilter = waitFilter ?? new WaitFilter();
            var typeName = _messageMapper.ResolveTypeName<TMessage>();
            waitFilter.Predicates.Add((m) => m.Type == typeName);

            var completion = new TaskCompletionSource<TMessage>();
            timeoutToken.Token.Register(() => completion.SetCanceled());

            try
            {
                _messageStreamClient.RegisterMessageReceivedHandler(_options.ClientName, (msg) =>
                {
                    var match = MatchFilter(waitFilter, msg);
                    if (match)
                    {
                        timeoutToken.Dispose();
                        TMessage mapped = _messageMapper.Map<TMessage>(msg);
                        completion.SetResult(mapped);
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
