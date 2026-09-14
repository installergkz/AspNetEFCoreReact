namespace NorthwindAspNetReact.Server.DAL.Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        //private bool _disposed = false;

        private readonly NorthwindContext _dbContext;
        private readonly DbSet<Order> _dbSet;

        public OrderRepository(NorthwindContext dbContext) : base(dbContext)
        {
            //_dbContext = dbContext ?? new NorthwindContext();
            _dbContext = dbContext;
            _dbSet = dbContext.Set<Order>();
        }

        public IQueryable<OrderDetail?> GetOrderDetails(int orderId)
        {
            return _dbContext.OrderDetails.AsNoTracking().Include(d => d.Product).ThenInclude(p => p.Category)
                .Where(o => o.OrderId == orderId).AsQueryable();
        }

        public async Task<OrderDetail?> GetOrderDetailAsync(int orderId, int productId)
        {
            return await _dbContext.OrderDetails.AsNoTracking().Include(d => d.Product).ThenInclude(p => p.Category)
                .FirstOrDefaultAsync(d => d.OrderId == orderId && d.ProductId == productId);
        }

        //public async IAsyncEnumerable<OrderDetail?> GetOrderDetailsAsync(int orderId)
        //{
        //    var details = _dbContext.OrderDetails.AsNoTracking().Include(d => d.Product).ThenInclude(p => p.Category)
        //        .Where(d => d.OrderId == orderId).ToAsyncEnumerable();

        //    await foreach (var item in details)
        //        yield return item;
        //}

        public async IAsyncEnumerable<OrderDetail?> GetOrderDetailsAsync(int orderId, int? productId)
        {
            var details = _dbContext.OrderDetails.AsNoTracking().Include(d => d.Product).ThenInclude(p => p.Category)
                .Where(d => d.OrderId == orderId && (productId.GetValueOrDefault() == 0 || d.ProductId == productId)).ToAsyncEnumerable();

            await foreach (var item in details)
                yield return item;
        }

        public async Task<OrderDetail?> CreateOrderDetailAsync(OrderDetail orderDetail)
        {
            await _dbContext.AddAsync(orderDetail);
            await _dbContext.SaveChangesAsync();
            return orderDetail;
        }

        public async Task UpdateOrderDetailAsync(OrderDetail orderDetail)
        {
            if (orderDetail == null)
                throw new ArgumentException("Entity not found.");

            _dbContext.Entry(orderDetail).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task<int?> DeleteOrderDetailsAsync(int orderId, int? productId)
        {
            return await _dbContext.OrderDetails.Where(d => d.OrderId == orderId && (productId.GetValueOrDefault() == 0 || d.ProductId == productId)).ExecuteDeleteAsync();

            //_dbContext.RemoveRange(details);
            //await _dbContext.SaveChangesAsync();
            //var details = _dbContext.FindAsync<OrderDetail>(orderId, (productId.GetValueOrDefault() == 0 || d.ProductId == productId)).AsAsyncEnumerable();
            //await foreach (var item in details)
            //{
            //    _dbContext.Remove(item);
            //    _dbContext.SaveChanges();
            //}
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
