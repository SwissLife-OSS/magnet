namespace Magnet.Client.Mappers
{
    public interface IMessageMapper
    {

    }

    public interface IMessageMapper<TMessage> : IMessageMapper
    {
        //MagnetMessage ToMagnetMessage(TMessage message);
        TMessage FromMagetMessage(MagnetMessage magnetMessage);
    }
}
