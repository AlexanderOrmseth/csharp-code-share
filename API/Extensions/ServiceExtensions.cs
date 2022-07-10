namespace API.Extensions;

public static class ServiceExtensions
{
    // Cors
    public static void ConfigureCors(this IServiceCollection services, string name)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(name: name,
                builder => builder.WithOrigins("http://localhost:3000")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials());
        });
    }
}