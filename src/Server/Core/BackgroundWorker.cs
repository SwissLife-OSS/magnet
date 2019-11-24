using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;

namespace Magnet
{
    public class BackgroundWorker : IHostedService
    {
        private readonly DataChangeTracker _changeTracker;

        public BackgroundWorker(DataChangeTracker changeTracker)
        {
            _changeTracker = changeTracker;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _changeTracker.Start();
            return Task.CompletedTask;

        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _changeTracker.Stop();
            return Task.CompletedTask;
        }
    }
}
