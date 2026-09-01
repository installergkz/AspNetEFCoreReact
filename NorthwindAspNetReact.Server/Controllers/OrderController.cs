using Microsoft.AspNetCore.Http.HttpResults;

namespace NorthwindAspNetReact.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        //private readonly IGenericRepository<Order> _orderRepository;
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        //public OrderController(IOrderService orderService)
        //public OrderController()
        //{
        //    _orderRepository = new OrderRepository(new NorthwindContext());
        //    _orderService = new OrderService(_orderRepository);
        //}

        //public OrderController(IGenericRepository<Order> orderRepository)
        //{
        //    _orderService = new OrderService(orderRepository);
        //}

        [HttpGet("GetCustomerIds")]
        public async Task<IActionResult> GetCustomerIds()
        {
            var result = new string[] { "ALFKI", "ANATR", "ANTON" };

            //await _orderService.GenericRepository.FindAsync(id);

            try
            {
                //var result = await _orderService.GetOrderWithDetailsAsync(id);
                //var result = await _orderService.GenericRepository.FindAsync(id);//.GetOrderWithDetailsAsync(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            try
            {
                //var result = _orderService.GenericRepository.GetAllAsync();
                var result = _orderService.GenericRepository.GetAllAsync().OrderByDescending(o => o?.OrderId).Take(5);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[HttpGet]
        //public async Task<IActionResult> Get()
        //{
        //    //await _orderService.GenericRepository.FindAsync(id);

        //    try
        //    {
        //        var result = await _orderService.GenericRepository.FindAsync(10248);
        //        var order = new { Id = result.OrderId, result.CustomerId, result.EmployeeId, result.OrderDate };
        //        return Ok(order);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        //public class OrderShort
        //{
        //    public int Id { get; set; }
        //    public string CustomerId { get; set; }
        //    public int EmployeeId { get; set; }
        //    public DateTime OrderDate { get; set; }

        //}

        //[HttpGet]
        //public IEnumerable<OrderShort> Get()
        //{
        //    var result = _orderService.GenericRepository.GetAll(o => o.OrderId == 10248 || o.OrderId == 10249).ToArray();

        //    var orders = new List<OrderShort>();

        //    foreach (var item in result)
        //    {
        //        var order = new OrderShort { Id = item.OrderId, CustomerId = item.CustomerId, EmployeeId = item.EmployeeId.GetValueOrDefault(), OrderDate = item.OrderDate.GetValueOrDefault() };
        //        orders.Add(order);
        //    }

        //    return orders;
        //}

        //[HttpGet]
        //public IEnumerable<object> Get()
        //{
        //    var result = _orderService.GenericRepository.GetAll(o => o.OrderId == 10248 || o.OrderId == 10249);

        //    foreach (var item in result)
        //        yield return new { Id = item.OrderId, item.CustomerId, item.EmployeeId, item.OrderDate };
        //    yield return new { Id = item.OrderId, item.CustomerId, item.EmployeeId, OrderDate = item.OrderDate.Value.ToShortDateString() };
        //}

        [HttpGet("{id:int}", Name="GetOrderWithDetails")]
        public async Task<IActionResult> GetOrderWithDetailsAsync(int id)
        {
            //await _orderService.GenericRepository.FindAsync(id);

            try
            {
                //var result = await _orderService.GetOrderWithDetailsAsync(id);
                var result = await _orderService.GenericRepository.FindAsync(id);//.GetOrderWithDetailsAsync(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[HttpGet("details/{orderId:int}/{productId:int?}")]
        //public async Task<IActionResult> GetOrderDetailsAsync(int orderId, int? productId)
        //{
        //    try
        //    {
        //        var result = await _orderService.GetOrderDetailsAsync(orderId, productId);
        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        //[HttpGet]
        //public async Task<IActionResult> GetAllAsync()
        //{
        //    try
        //    {
        //        var result = await _orderService.GetAllAsync();
        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        [HttpPost]
        public async Task<IActionResult> CreateAsync(Order order)
        {
            try
            {
                var resultNewOrderIdAsync = await _orderService.GenericRepository.CreateAsync(order);
                //order.Id = resultNewOrderIdAsync.GetValueOrDefault();

                return CreatedAtAction("GetOrderWithDetails", new { id = resultNewOrderIdAsync.OrderId }, order);
                //return CreatedAtAction(nameof(GetOrderWithDetailsAsync), new { id = 10248}, order);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            try
            {
                await _orderService.GenericRepository.DeleteAsync(id);
                return Ok();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[HttpPut]
        //public async Task<IActionResult> UpdateOrderAsync(Order order)
        //{
        //    try
        //    {
        //        var updatedOrder = await _orderService.UpdateOrderAsync(order);
        //        if (updatedOrder == null)
        //            return NotFound();

        //        return Ok(updatedOrder);
        //    }
        //    catch (InvalidOperationException ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

    }
}
