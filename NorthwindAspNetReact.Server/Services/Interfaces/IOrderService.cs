namespace NorthwindAspNetReact.Server.Services.Interfaces
{
    public interface IOrderService : IGenericService<Order>
    {
        public Task<Order?> GetOrderWithDetailsAsync(int id);
        public IQueryable<OrderDetail?> GetOrderDetails(int orderId, int? productId);
        public IAsyncEnumerable<OrderDetail?> GetOrderDetailsAsync(int orderId, int? productId);
        public Task UpdateOrderDetailAsync(OrderDetailDto orderDetail);
        public Task UpdateOrderDetailsAsync(IEnumerable<OrderDetailDto> orderDetails);

    }
}
