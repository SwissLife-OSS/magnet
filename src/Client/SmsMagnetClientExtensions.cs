using System.Threading.Tasks;

namespace Magnet.Client
{
    public static class SmsMagnetClientExtensions
    {
        public static async Task<SmsMessage> WaitForSms(
            this MagnetClient client,
            string to,
            WaitOptions options= null)
        {
            WaitFilter filter = FilterBuilder.To(to).Build();
            return await client.WaitFor<SmsMessage>(filter, options);
        }
    }
}
