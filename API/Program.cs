using System.Reflection;
using API.Context;
using API.Extensions;
using API.Interfaces;
using API.Middleware;
using API.Repositories;
using API.Services;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.EntityFrameworkCore;

const string myAllowSpecificOrigins = "_myAllowSpecificOrigins";


var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.

builder.Services.AddControllers()
    .AddFluentValidation(fv => { fv.RegisterValidatorsFromAssemblyContaining<Program>(); });

// Db connection for development and production (heroku)
builder.Services.AddDbContext<MyDbContext>(options =>
{
    var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

    string connStr;

    if (env == "Development")
    {
        // Use connection string from file.
        connStr = configuration.GetConnectionString("DefaultConnection");
    }
    else
    {
        // Use connection string provided at runtime by Heroku.
        var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

        // Parse connection URL to connection string for Npgsql
        connUrl = connUrl.Replace("postgres://", string.Empty);
        var pgUserPass = connUrl.Split("@")[0];
        var pgHostPortDb = connUrl.Split("@")[1];
        var pgHostPort = pgHostPortDb.Split("/")[0];
        var pgDb = pgHostPortDb.Split("/")[1];
        var pgUser = pgUserPass.Split(":")[0];
        var pgPass = pgUserPass.Split(":")[1];
        var pgHost = pgHostPort.Split(":")[0];
        var pgPort = pgHostPort.Split(":")[1];

        connStr =
            $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};SSL Mode=Require;Trust Server Certificate=true";
    }

    // Whether the connection string came from the local development configuration file
    // or from the environment variable from Heroku, use it to set up your DbContext.
    options.UseNpgsql(connStr);
});

// Cors settings
builder.Services.ConfigureCors(myAllowSpecificOrigins);

// Repositories
builder.Services.AddScoped<ICodeRepository, CodeRepository>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opt =>
{
    // Set the comments path for the XmlComments file.
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    opt.IncludeXmlComments(xmlPath);
});

// services
builder.Services.AddHostedService<RepeatingService>();

// todo: add mediatr
//builder.Services.AddMediatR(typeof(Program).Assembly);

var app = builder.Build();

// set localization -> this fixes decimal error -> "." instead of ","
app.UseRequestLocalization(new RequestLocalizationOptions().SetDefaultCulture("en-US"));

app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHttpsRedirection();
}

// setup static 
app.UseDefaultFiles();
app.UseStaticFiles();

// Cors
app.UseCors(myAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

// routing fallback
app.MapFallbackToController("Index", "Fallback");

// MigrateAsync
using var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<MyDbContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    await context.Database.MigrateAsync();
}
catch (Exception e)
{
    logger.LogError(e, "Problem migrating data");
}


app.Run();