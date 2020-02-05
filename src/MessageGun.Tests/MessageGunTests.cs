using System;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using Newtonsoft.Json;
using Snapshooter.Xunit;
using Xunit;

namespace Magnet
{
    public class MessageGunTests
    {
        [Fact]
        public async Task Trigger_Success()
        {
            //arrange
            HttpRequestMessage sentRequest = null;
            IHttpClientFactory factory = CreateHttpClientFactoryMock(msg =>
            {
                sentRequest = msg;

            });
            var gun = new MessageGun(factory, new MessageGunOptions());

            //act
            await gun.TriggerAsync(MessageBuilder.New("Pdf", "UnitTest"), default);


            //assert
            sentRequest.Should().NotBeNull();
            MagnetMessage message = await GetMessageFromRequest(sentRequest);
            message.MatchSnapshot(o => o
                   .IgnoreField("Id")
                   .IgnoreField("ReceivedAt"));

        }

        private static async Task<MagnetMessage> GetMessageFromRequest(
            HttpRequestMessage sentRequest)
        {
            var json = await sentRequest.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<MagnetMessage>(json);
        }

        private IHttpClientFactory CreateHttpClientFactoryMock(
            Action<HttpRequestMessage> beforeSendRequest  )
        {
            Func<HttpRequestMessage, CancellationToken, Task<HttpResponseMessage>> handler =
                (HttpRequestMessage message, CancellationToken token) =>
                {
                    beforeSendRequest(message);
                    return Task.FromResult(new HttpResponseMessage(HttpStatusCode.OK));
                };

            var client = new HttpClient(new DelegatingHandlerStub(handler))
            { BaseAddress = new Uri("http://foo") };
            var mock = new Mock<IHttpClientFactory>(MockBehavior.Strict);
            mock.Setup(_ => _.CreateClient(It.IsAny<string>())).Returns(client);
            return mock.Object;
        }


        public class DelegatingHandlerStub : DelegatingHandler
        {
            private readonly Func<HttpRequestMessage,
                CancellationToken, Task<HttpResponseMessage>> _handlerFunc;

            public DelegatingHandlerStub(
                Func<HttpRequestMessage, CancellationToken, Task<HttpResponseMessage>> handlerFunc)
            {
                _handlerFunc = handlerFunc;
            }

            protected override Task<HttpResponseMessage> SendAsync(
                HttpRequestMessage request,
                CancellationToken cancellationToken)
            {
                return _handlerFunc(request, cancellationToken);
            }
        }
    }
}
