namespace Magnet.Client.Mappers;

public interface IMessageMapper
{

}

public interface IMessageMapper<TMessage> : IMessageMapper
{
    TMessage FromMagetMessage(MagnetMessage magnetMessage);
}
