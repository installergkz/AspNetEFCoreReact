using Microsoft.AspNetCore.Http.HttpResults;

namespace NorthwindAspNetReact.Server.Controllers
{
    [ApiController]
    //[Route("[controller]")]
    [Route("northwind/orders")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("GetCustomerIds")]
        //[HttpGet("northwind/orders/GetCustomerIds")]
        public async Task<IActionResult> GetCustomerIds()
        {
            var result = new string[] { "ALFKI", "ANATR", "ANTON" };

            try
            {
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetProducts/{id:int?}")]
        public async Task<IActionResult> GetProductIds(int? id)
        {
            //var result = Enumerable.Range(1, 77);

            var result = new Dictionary<int, string>()
            {
                { 1, "Chai" },
                { 2, "Chang" },
                { 3, "Aniseed Syrup" },
                { 4, "Chef Anton's Cajun Seasoning" },
                { 5, "Chef Anton's Gumbo Mix" }
            };

            try
            {
                return id.GetValueOrDefault() != 0 ? Ok(result[id.Value]) : Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetOrdersAsync()
        {
            try
            {
                //var result = _orderService.GenericRepository.GetAllAsync();
                var result = _orderService.OrderRepository.GetAllAsync().OrderByDescending(o => o?.OrderId).Take(5);
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

        [HttpGet("{id:int}", Name="GetOrder")]
        public async Task<IActionResult> GetOrderAsync(int id)
        {
            try
            {
                //var result = await _orderService.GetOrderWithDetailsAsync(id);
                var result = await _orderService.OrderRepository.FindAsync(id);//.GetOrderWithDetailsAsync(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[HttpGet("details/{orderId:int}/{productId:int}", Name = "GetOrderDetail")]
        //public async Task<IActionResult> GetOrderDetailAsync(int orderId, [FromQuery] int productId)
        //{
        //    try
        //    {
        //        var result = await _orderService.GetOrderDetailAsync(orderId, productId);
        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        //[HttpGet("details/{orderId:int}")]
        //public async Task<IActionResult> GetOrderDetailsAsync(int orderId)
        //{
        //    try
        //    {
        //        var result = _orderService.GetOrderDetailsAsync(orderId);

        //        // IQueryable версия.
        //        //var result = _orderService.GetOrderDetails(orderId);
        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        [HttpGet("details/{orderId:int}", Name = "GetOrderDetails")]
        public async Task<IActionResult> GetOrderDetailsAsync(int orderId, [FromQuery] int? productId)
        {
            try
            {
                var result = _orderService.GetOrderDetailsAsync(orderId, productId);

                // IQueryable версия.
                //var result = _orderService.GetOrderDetails(orderId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrderAsync(Order order)
        {
            try
            {
                var result = await _orderService.OrderRepository.CreateAsync(order);

                return CreatedAtAction("GetOrder", new { id = result?.OrderId }, order);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("details")]
        public async Task<IActionResult> CreateOrderDetailAsync(OrderDetailDto orderDetail)
        {
            try
            {
                var result = await _orderService.CreateOrderDetailAsync(orderDetail);

                return CreatedAtAction("GetOrderDetails", new { orderId = result?.OrderId, productId = result?.ProductId }, orderDetail);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateOrderAsync(Order order)
        {
            try
            {
                await _orderService.OrderRepository.UpdateAsync(order);
                return Ok();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("details")]
        public async Task<IActionResult> UpdateOrderDetailAsync(OrderDetail orderDetail)
        {
            try
            {
                await _orderService.OrderRepository.UpdateOrderDetailAsync(orderDetail);
                return Ok();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteOrderAsync(int id)
        {
            try
            {
                await _orderService.OrderRepository.DeleteAsync(id);
                return Ok();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[HttpDelete("details/{orderId:int}$productId={productId:int?}")]
        [HttpDelete("details/{orderId:int}")]
        public async Task<IActionResult> DeleteOrderDetailsAsync(int orderId, [FromQuery] int? productId)
        {
            try
            {
                var deletedCount = await _orderService.OrderRepository.DeleteOrderDetailsAsync(orderId, productId);
                return Ok(deletedCount);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
   

    }
}
