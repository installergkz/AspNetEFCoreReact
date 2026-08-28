using Microsoft.EntityFrameworkCore;

namespace NorthwindAspNetReact.Server.DAL.Repositories
{
    public class OrderRepository_OLD : IGenericRepository<Order>
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

        public OrderRepository_OLD(NorthwindContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<Order>();
        }

        //public async Task<Order?> GetAsync(int id)
        //{
        //    using var connection = _dataBaseWorker.CreateConnection();
        //    return await connection.QueryFirstOrDefaultAsync<Order>(Queries.StoredPocudures.GetOrders, param: new { OrderID = id });
        //}
        public async Task<Order?> FindAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<Order?> GetAsync(int id)
        {
            return await _dbSet.Include(o => o.OrderDetails).ThenInclude(d => d.Product).AsNoTracking().FirstOrDefaultAsync(o => o.OrderId == id);
        }

        public IQueryable<Order?> GetAll()
        {
            return _dbSet.Include(o => o.OrderDetails).ThenInclude(d => d.Product).AsNoTracking();
        }

        public IQueryable<Order?> GetAll(Func<Order, bool> predicate)
        {
            return _dbSet.Include(o => o.OrderDetails).ThenInclude(d => d.Product).AsNoTracking().Where(predicate).AsQueryable();
        }

        public async IAsyncEnumerable<Order?> GetAllAsync()
        {
            await foreach (var item in _dbSet.Include(o => o.OrderDetails).ThenInclude(d => d.Product).AsNoTracking().AsAsyncEnumerable())
                yield return item;
        }

        public async IAsyncEnumerable<Order?> GetAllAsync(Func<Order, bool> predicate)
        {
            await foreach (var item in _dbSet.Include(o => o.OrderDetails).ThenInclude(d => d.Product).AsNoTracking().Where(predicate).ToAsyncEnumerable())
                yield return item;
        }

        public async Task<Order?> CreateAsync(Order order)
        {
            await _dbSet.AddAsync(order);
            await _dbContext.SaveChangesAsync();
            return order;
        }

        public async Task UpdateAsync(Order order)
        {
            if (order == null)
                throw new ArgumentException("Order not found.");

            _dbContext.Entry(order).State = EntityState.Modified;
            _dbContext.SaveChanges();
        }

        public async Task DeleteAsync(Order order)
        {
            if (order == null)
                throw new ArgumentException("Order not found.");

            _dbSet.Remove(order);
            _dbContext.SaveChanges();
        }

        public async Task DeleteAsync(int id)
        {
            var order = await _dbSet.FindAsync(id) ?? throw new ArgumentException("Order not found.");
            _dbSet.Remove(order);
            _dbContext.SaveChanges();
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
