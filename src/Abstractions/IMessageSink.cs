using System.Threading.Tasks;

namespace Magnet
{
    public interface IMessageSink
    {
        Task<string> ProcessMessageAsync(MagnetMessage message);
    }
}