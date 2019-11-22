using System;
using System.Text;

namespace Magnet
{

    public interface IMessageMapper
    {

    }

    public interface IMessageMapper<TMessage> : IMessageMapper
    {
        MagnetMessage ToMagnetMessage(TMessage message);
        TMessage FromMagetMessage(MagnetMessage magnetMessage);
    }
}
