using System;
using System.Collections.Generic;

namespace Magnet.Client
{
    public interface IMessageStreamClient
    {
        void RegisterMessageReceivedHandler(string clientName, Action<MagnetMessage> handler);
    }
}
