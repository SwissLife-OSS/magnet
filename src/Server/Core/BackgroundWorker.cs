using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Magnet;

public class BackgroundWorker : IHostedService
{
    private readonly DataChangeTracker _changeTracker;
    private readonly ILogger<BackgroundWorker> _logger;

    public BackgroundWorker(
        DataChangeTracker changeTracker,
        ILogger<BackgroundWorker> logger)
    {
        _changeTracker = changeTracker;
        _logger = logger;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogInformation("Starting");
            await _changeTracker.Start(cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Could not start");
            throw;
        }
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        await _changeTracker.Stop();
    }
}
