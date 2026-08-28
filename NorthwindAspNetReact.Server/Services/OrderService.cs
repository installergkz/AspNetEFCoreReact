namespace NorthwindAspNetReact.Server.Services
{
    public class OrderService : IOrderService
    {
        private readonly IGenericRepository<Order> _orderRepository;

        public OrderService(IGenericRepository<Order> orderRepository) 
        {
            _orderRepository = orderRepository;
        }

        public IGenericRepository<Order> GenericRepository => _orderRepository;

        public async Task<Order?> GetOrderWithDetailsAsync(int id)
        {
            throw new NotImplementedException();

            //var order = await _orderRepository.GetAsync(id) ?? throw new ArgumentException($"Order with id {id} not found.");
            //var asyncResult = await _orderDetailsRepository.GetAllAsync(d => d.OrderId == id);
            //order.Details = [.. asyncResult];
            //return order;
        }

        public IQueryable<OrderDetail?> GetOrderDetails(int orderId, int? productId)
        {
            throw new NotImplementedException();
        }

        public IAsyncEnumerable<OrderDetail?> GetOrderDetailsAsync(int orderId, int? productId)
        {
            throw new NotImplementedException();

            //var details = await _orderDetailsRepository.GetAllAsync(d => d.OrderId == orderId) ??
            //    throw new ArgumentException($"OrderDetails with order id {orderId} not found.");

            //if (productId.GetValueOrDefault() != 0)
            //    details = details.Where(d => d.ProductId == productId);

            //if (!details.Any())
            //    throw new ArgumentException($"OrderDetail with order id {orderId} and product id {productId} not found.");

            //return details;
        }

        public async Task UpdateOrderDetailAsync(OrderDetailDto orderDetail)
        {
            throw new NotImplementedException();

            //if (orderDetail == null)
            //    return null;

            //var asyncExsistingOrderDetailResult = await _orderDetailsRepository
            //    .GetAllAsync(d => d.OrderId == orderDetail.OrderId && d.ProductId == orderDetail.ProductId);
            //var exsistingOrderDetail = asyncExsistingOrderDetailResult.FirstOrDefault();

            //if (exsistingOrderDetail == null)
            //    return null;

            //var orderStatus = exsistingOrderDetail.Order?.Status;// ?? await _orderRepository.GetAsync(exsistingOrderDetail.OrderId)?.Status;
            //if (orderStatus == null)
            //{
            //    var asyncStatusResult = await _orderRepository.GetAsync(exsistingOrderDetail.OrderId);
            //    orderStatus = asyncStatusResult?.Status;
            //}

            //if (orderStatus != OrderStatus.New)
            //    throw new InvalidOperationException("Нельзя изменять заказ со статусом не \"Новый\"");

            //await _orderDetailsRepository.UpdateAsync(orderDetail);
            //return orderDetail;
        }

        public async Task UpdateOrderDetailsAsync(IEnumerable<OrderDetailDto> orderDetails)
        {
            throw new NotImplementedException();

            //if (orderDetails == null)
            //    yield break;

            //foreach (var item in orderDetails)
            //    await UpdateOrderDetailAsync(item);
        }

    }
}
