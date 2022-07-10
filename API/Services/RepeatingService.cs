using API.Interfaces;

namespace API.Services;

public class RepeatingService : BackgroundService
{
    private readonly IServiceScopeFactory _factory;
    private readonly ILogger<RepeatingService> _logger;
    private readonly PeriodicTimer _timer = new(TimeSpan.FromMinutes(15));


    public RepeatingService(ILogger<RepeatingService> logger, IServiceScopeFactory factory)
    {
        _logger = logger;
        _factory = factory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (await _timer.WaitForNextTickAsync(stoppingToken) && !stoppingToken.IsCancellationRequested)
            try
            {
                await using var asyncScope = _factory.CreateAsyncScope();
                var codeFragmentRepository = asyncScope.ServiceProvider.GetRequiredService<ICodeRepository>();
                var didRemove = await codeFragmentRepository.DeleteOldCodeFragments(stoppingToken);

                if (didRemove)
                    _logger.LogInformation("Executed PeriodicHostedService - Successfully removed items");
                else
                    _logger.LogInformation("Executed PeriodicHostedService - No items removed");
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Failed to execute PeriodicHostedService with exception message: {ExMessage}",
                    ex.Message);
            }
    }
}