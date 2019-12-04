using System.Threading.Tasks;

namespace Magnet.Client
{
    public static class EmailReceiverExtensions
    {
        public static async Task<EmailMessage> WaitForEmail(
            this MessageReceiver client,
            string to,
            WaitOptions options = null)
        {
            WaitFilter filter = FilterBuilder.To(to).Build();
            return await client.WaitFor<EmailMessage>(filter, options);
        }
    }

}
