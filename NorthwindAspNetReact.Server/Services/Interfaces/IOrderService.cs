namespace NorthwindAspNetReact.Server.Services.Interfaces
{
    public interface IOrderService// : IGenericService<Order>
    {
        public IOrderRepository OrderRepository { get; }
        //public IGenericRepository<Order> GenericRepository { get; }

        //public Task<Order?> GetOrderWithDetailsAsync(int id);
        
        public Task<OrderDetailDto?> GetOrderDetailAsync(int orderId, int productId);
        public IAsyncEnumerable<OrderDetailDto?> GetOrderDetailsAsync(int orderId);
        public IQueryable<OrderDetailDto?> GetOrderDetails(int orderId);
        public Task<OrderDetail?> CreateOrderDetailAsync(OrderDetailDto orderDetail);
        //public Task UpdateOrderDetailAsync(OrderDetailDto orderDetail);
        //public Task UpdateOrderDetailsAsync(IEnumerable<OrderDetailDto> orderDetails);
        //public Task DeleteOrderDetailsAsync(IEnumerable<OrderDetailDto> orderDetails);

    }
}
