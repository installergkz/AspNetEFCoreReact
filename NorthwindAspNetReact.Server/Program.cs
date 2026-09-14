var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var services = builder.Services;

var connection = builder.Configuration.GetConnectionString("DefaultConnection");
services.AddDbContext<NorthwindContext>(options => options.UseSqlServer(connection));

services.AddTransient<IGenericRepository<Order>, GenericRepository<Order>>();
services.AddTransient<IOrderRepository, OrderRepository>();
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

//app.MapControllerRoute(
//    name: "default",
//    pattern: "{controller=Northwind/Order}");

app.MapFallbackToFile("/index.html");

app.Run();
