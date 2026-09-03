using Microsoft.AspNetCore.Identity;

namespace NorthwindAspNetReact.Server.Services
{
    public class OrderService : IOrderService
    {
        //private readonly IGenericRepository<Order> _genericRepository;
        private readonly IOrderRepository _orderRepository;

        //public OrderService(IOrderRepository orderRepository, IGenericRepository<Order> genericRepository)
        //{
        //    _orderRepository = orderRepository;
        //    _genericRepository = genericRepository;
        //}

        public OrderService(IOrderRepository orderRepository) 
        {
            _orderRepository = orderRepository;
        }

        public IOrderRepository OrderRepository => _orderRepository;
        //public IGenericRepository<Order> GenericRepository => _genericRepository;

        //public IQueryable<OrderDetail?> GetOrderDetails(int orderId, int? productId)
        //{
        //    //return _orderRepository.GetOrderDetails(orderId, productId);
        //    //return _orderRepository.GetOrderDetails(orderId, productId);

        //    var details = _genericRepository.GetAll(o => o.OrderId == orderId).FirstOrDefault();

        //    //throw new NotImplementedException();
        //}

        public async Task<OrderDetailDto?> GetOrderDetailAsync(int orderId, int productId)
        {
            var detail = await _orderRepository.GetOrderDetailAsync(orderId, productId);

            var detailDto = new OrderDetailDto()
            {
                OrderId = detail.OrderId,
                ProductId = detail.ProductId,
                UnitPrice = detail.UnitPrice,
                Discount = detail.Discount,
                Quantity = detail.Quantity,
                ProductName = detail.Product.ProductName,
                CategoryId = detail.Product.CategoryId,
                CategoryName = detail.Product.Category.CategoryName
            };

            return detailDto;
        }

        public async IAsyncEnumerable<OrderDetailDto?> GetOrderDetailsAsync(int orderId)
        {
            var orderDetails = _orderRepository.GetOrderDetailsAsync(orderId);

            await foreach (var detail in orderDetails)
            {
                var detailDto = new OrderDetailDto()
                {
                    OrderId = detail.OrderId,
                    ProductId = detail.ProductId,
                    UnitPrice = detail.UnitPrice,
                    Discount = detail.Discount,
                    Quantity = detail.Quantity,
                    ProductName = detail.Product.ProductName,
                    CategoryId = detail.Product.CategoryId,
                    CategoryName = detail.Product.Category.CategoryName
                };

                yield return detailDto;
            }
        }

        public IQueryable<OrderDetailDto?> GetOrderDetails(int orderId)
        {
            return _orderRepository.GetOrderDetails(orderId)
                .Select(d => 
                    new OrderDetailDto()
                    {
                        OrderId = d.OrderId,
                        ProductId = d.ProductId,
                        UnitPrice = d.UnitPrice,
                        Discount = d.Discount,
                        Quantity = d.Quantity,
                        ProductName = d.Product.ProductName,
                        CategoryId = d.Product.CategoryId,
                        CategoryName = d.Product.Category.CategoryName
                    });
        }

        public async Task<OrderDetail?> CreateOrderDetailAsync(OrderDetailDto orderDetail)
        {
            var detail = new OrderDetail()
            {
                OrderId = orderDetail.OrderId.GetValueOrDefault(),
                ProductId = orderDetail.ProductId.GetValueOrDefault(),
                UnitPrice = orderDetail.UnitPrice.GetValueOrDefault(),
                Discount = orderDetail.Discount.GetValueOrDefault(),
                Quantity = orderDetail.Quantity.GetValueOrDefault()
            };

            return await _orderRepository.CreateOrderDetailAsync(detail);
        }

        //public async Task UpdateOrderDetailAsync(OrderDetailDto orderDetail)
        //{
        //    var detail = await GetOrderDetailsAsync(orderDetail.OrderId.GetValueOrDefault(), orderDetail.ProductId).FirstOrDefaultAsync();

        //    _orderRepository.UpdateOrderDetailAsync();

        //    throw new NotImplementedException();

        //    //if (orderDetail == null)
        //    //    return null;

        //    //var asyncExsistingOrderDetailResult = await _orderDetailsRepository
        //    //    .GetAllAsync(d => d.OrderId == orderDetail.OrderId && d.ProductId == orderDetail.ProductId);
        //    //var exsistingOrderDetail = asyncExsistingOrderDetailResult.FirstOrDefault();

        //    //if (exsistingOrderDetail == null)
        //    //    return null;

        //    //var orderStatus = exsistingOrderDetail.Order?.Status;// ?? await _orderRepository.GetAsync(exsistingOrderDetail.OrderId)?.Status;
        //    //if (orderStatus == null)
        //    //{
        //    //    var asyncStatusResult = await _orderRepository.GetAsync(exsistingOrderDetail.OrderId);
        //    //    orderStatus = asyncStatusResult?.Status;
        //    //}

        //    //if (orderStatus != OrderStatus.New)
        //    //    throw new InvalidOperationException("Нельзя изменять заказ со статусом не \"Новый\"");

        //    //await _orderDetailsRepository.UpdateAsync(orderDetail);
        //    //return orderDetail;
        //}
        
    }
}
