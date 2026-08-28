using Microsoft.AspNetCore.Mvc;

namespace NorthwindAspNetReact.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public WeatherForecastController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        private static readonly string[] Summaries =
        [
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        ];

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        //public class OrderShort
        //{
        //    public int Id { get; set; }
        //    public string CustomerId { get; set; }
        //    public int EmployeeId { get; set; }
        //    public DateTime OrderDate { get; set; }

        //}

        //[HttpGet("Orders/")]
        //public IEnumerable<OrderShort> GetOrders()
        //{
        //    var result = _orderService.GenericRepository.GetAll(o => o.OrderId == 10248 || o.OrderId == 10249).ToArray();

        //    var orders = new List<OrderShort>();

        //    foreach (var item in result)
        //    {
        //        var order = new OrderShort { Id = item.OrderId, CustomerId = item.CustomerId, EmployeeId = item.EmployeeId.GetValueOrDefault(), OrderDate = item.OrderDate.Value.Date };
        //        orders.Add(order);
        //    }

        //    return orders;
        //}

        //[HttpGet("Orders/")]
        //public IEnumerable<object> GetOrders()
        //{
        //    var result = _orderService.GenericRepository.GetAll(o => o.OrderId == 10248 || o.OrderId == 10249);

        //    foreach (var item in result)
        //        yield return new { Id = item.OrderId, item.CustomerId, item.EmployeeId, item.OrderDate };
        //}
    }
}
