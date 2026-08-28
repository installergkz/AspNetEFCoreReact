using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var services = builder.Services;

var connection = builder.Configuration.GetConnectionString("DefaultConnection");
services.AddDbContext<NorthwindContext>(options => options.UseSqlServer(connection));

services.AddTransient<IGenericRepository<Order>, GenericRepository<Order>>();
//services.AddTransient<NorthwindContext>();
//services.AddTransient(typeof(IGenericRepository<Order>), typeof(GenericRepository<Order>));
//services.AddTransient<IGenericService<Order>, OrderService>();
services.AddTransient<IOrderService, OrderService>();

services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
services.AddOpenApi();



var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
