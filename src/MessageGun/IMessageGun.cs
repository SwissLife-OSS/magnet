using System.Threading;
using System.Threading.Tasks;

namespace Magnet;

public interface IMessageGun
{
    Task TriggerAsync(MessageBuilder builder, CancellationToken cancellationToken);
}
