using Microsoft.EntityFrameworkCore;

namespace NorthwindAspNetReact.Server.DAL.Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        //private bool _disposed = false;
        //private readonly IDataBaseWorker _dataBaseWorker;
        private readonly NorthwindContext _dbContext;
        private readonly DbSet<Order> _dbSet;

        //public OrderRepository(IDataBaseWorker dataBaseWorker, NorthwindContext dbContext)
        //{
        //    _dataBaseWorker = dataBaseWorker;

        //    _dbContext = dbContext;
        //    _dbSet = _dbContext.Set<Order>();
        //}

        public OrderRepository(NorthwindContext dbContext) : base(dbContext)
        {
            //dbContext ??= new NorthwindContext();

            _dbSet = dbContext.Set<Order>();
        }

        public IQueryable<OrderDetail?> GetOrderDetails(int orderId, int? productId)
        {
            var details = _dbSet.Include(o => o.OrderDetails).AsNoTracking().Where(o => o.OrderId == orderId).Select(o => o.OrderDetails).Cast<OrderDetail>(); ;

            if (productId.GetValueOrDefault() != 0)
                details = details.Where(d => d.ProductId == productId);

            return details;
        }

        public IAsyncEnumerable<OrderDetail?> GetOrderDetailsAsync(int orderId, int? productId)
        {
            throw new NotImplementedException();

            //await foreach (var item in _dbSet.Include(o => o.OrderDetails).ThenInclude(d => d.Product).AsNoTracking().AsAsyncEnumerable())
            //    yield return item;

            //var details = _dbSet.Include(o => o.OrderDetails).AsNoTracking().Where(o => o.OrderId == orderId).Select(o => o.OrderDetails).Cast<OrderDetail>();

            //if (productId.GetValueOrDefault() != 0)
            //    details = details.Where(d => d.ProductId == productId);

            //for

            //return details;
        }

        public Task UpdateOrderDetailAsync(OrderDetail orderDetail)
        {
            throw new NotImplementedException();
        }

        public Task UpdateOrderDetailsAsync(IEnumerable<OrderDetail> orderDetails)
        {
            throw new NotImplementedException();
        }

        //public virtual void Dispose(bool disposing)
        //{
        //    if (!_disposed)
        //    {
        //        if (disposing)
        //        {
        //            _dataBaseWorker.Dispose();
        //        }
        //    }
        //    _disposed = true;
        //}

        //public void Dispose()
        //{
        //    Dispose(true);
        //    GC.SuppressFinalize(this);
        //}
    }
}
