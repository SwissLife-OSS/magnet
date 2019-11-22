using System;
using System.Text;

namespace Magnet
{
    public interface IMessageMapper<TMessage>
    {
        MagnetMessage ToMagnetMessage(TMessage message);
        TMessage FromMagetMessage(MagnetMessage magnetMessage);
    }
}
