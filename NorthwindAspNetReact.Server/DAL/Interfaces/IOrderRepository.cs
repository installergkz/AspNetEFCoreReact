namespace NorthwindAspNetReact.Server.DAL.Interfaces
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        public IQueryable<OrderDetail?> GetOrderDetails(int orderId);
        public Task<OrderDetail?> GetOrderDetailAsync(int orderId, int productId);
        public IAsyncEnumerable<OrderDetail?> GetOrderDetailsAsync(int orderId);
        public Task<OrderDetail?> CreateOrderDetailAsync(OrderDetail orderDetail);
        public Task UpdateOrderDetailAsync(OrderDetail orderDetail);
        public Task<int?> DeleteOrderDetailsAsync(int orderId, int? productId);
    }
}
