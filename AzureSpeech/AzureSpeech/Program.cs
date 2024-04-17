using Microsoft.Extensions.Configuration;
using AzureSpeech.Interfaces;
using AzureSpeech.Repository;
using AzureSpeech.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddSingleton<ISpeechRepository, AzureSpeechRepository>();
builder.Services.AddScoped<TextToSpeechService>();
builder.Services.AddScoped<SpeechToTextService>();

builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();    
}

app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    options.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();

app.UseRouting();   

app.UseAuthorization();

app.MapControllers();

app.Run();
