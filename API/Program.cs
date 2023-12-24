using System.Text;
using API.Data;
using API.Extensions;
using API.interfaces;
using API.Middelware;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.ApplicationService(builder.Configuration);
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();




// Configure the HTTP request pipeline.
/* if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
 */
app.UseMiddleware<ExceptionMiddelware>();

app.UseHttpsRedirection();

app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();


using var scope = app.Services.CreateScope();
 var services = scope.ServiceProvider;

 try
 {
    var context = services.GetRequiredService<DataContext>();

    await context.Database.MigrateAsync();

    await Seed.SeedUsers(context);
 }
 catch (Exception ex)
 {
    var logger = services.GetRequiredService<ILogger<Program>>();
     logger.LogError(ex,"An error occurred during migration");
 }

 await app.RunAsync();


