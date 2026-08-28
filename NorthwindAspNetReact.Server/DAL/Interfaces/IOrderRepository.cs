namespace NorthwindAspNetReact.Server.DAL.Interfaces
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        public IQueryable<OrderDetail?> GetOrderDetails(int orderId, int? productId);
        public IAsyncEnumerable<OrderDetail?> GetOrderDetailsAsync(int orderId, int? productId);
        public Task UpdateOrderDetailAsync(OrderDetail orderDetail);
        public Task UpdateOrderDetailsAsync(IEnumerable<OrderDetail> orderDetails);
    }
}
