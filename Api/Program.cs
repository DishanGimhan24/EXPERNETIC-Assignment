using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting; // Include for IHostEnvironment
using Microsoft.EntityFrameworkCore; // Include for UseSqlServer
using LibraryManagementApi.Data; // Assuming your DbContext is in this namespace

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder
            .WithOrigins("http://localhost:3000") // Allow requests from your React app
            .AllowAnyMethod()   // Allow any HTTP method (GET, POST, PUT, DELETE, etc.)
            .AllowAnyHeader()); // Allow any header
});

// Configure Entity Framework Core to use SQL Server
builder.Services.AddDbContext<LibraryContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("LibraryDb")));

// Add services for controllers (API endpoints)
builder.Services.AddControllers();

// Optional: Add Swagger for API documentation (recommended for development)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Use CORS policy
app.UseCors("AllowReactApp");

// Use HTTPS redirection
app.UseHttpsRedirection();

// Optional: Enable middleware to serve generated Swagger as a JSON endpoint.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(); // Enable Swagger UI
}

// Use authorization (if you have any authentication setup)
app.UseAuthorization();

// Map controllers to routes
app.MapControllers();

// Run the application
app.Run();
