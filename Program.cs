using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// define a CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowViteDevServer",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") // URL of the React app
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
    options.AddPolicy("AllowGitHubPages",
        policy =>
        {
            policy.WithOrigins("https://ivan-2022b.github.io") // production
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

// add services to the container.
// learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerDocumentUrlsPath = "/openapi/v1.json";
    });
    // use the CORS policy in development
    app.UseCors("AllowViteDevServer");
}
else // production configuration
{
    // serve static files from the React build output
    app.UseDefaultFiles();
    /*app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(
            Path.Combine(Directory.GetCurrentDirectory(), "theclient", "dist"))
    });*/
    app.UseCors("AllowGitHubPages");
    app.UseExceptionHandler("/error");
}

app.UseHttpsRedirection();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "theclient", "dist"))
});
app.UseRouting();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

// for single-page apps, this ensures that any non-API routes are handled by the React app's index.html
app.MapFallbackToFile("/index.html", new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "theclient", "dist"))
});

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
