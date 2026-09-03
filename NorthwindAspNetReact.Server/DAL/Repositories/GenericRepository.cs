namespace NorthwindAspNetReact.Server.DAL.Repositories
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        //private bool _disposed = false;

        private readonly NorthwindContext _dbContext;
        private readonly DbSet<TEntity> _dbSet;

        public GenericRepository(NorthwindContext dbContext)
        {
            //_dbContext = dbContext ?? new NorthwindContext();
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<TEntity>();
        }

        public async Task<TEntity?> FindAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public IQueryable<TEntity?> GetAll()
        {
            return _dbSet.AsNoTracking();
        }

        public IQueryable<TEntity?> GetAll(Func<TEntity, bool> predicate)
        {
            return _dbSet.AsNoTracking().Where(predicate).AsQueryable();
        }

        public async IAsyncEnumerable<TEntity?> GetAllAsync()
        {
            await foreach (var item in _dbSet.AsNoTracking().AsAsyncEnumerable())
                yield return item;
        }

        public async IAsyncEnumerable<TEntity?> GetAllAsync(Func<TEntity, bool> predicate)
        {
            await foreach (var item in _dbSet.AsNoTracking().Where(predicate).ToAsyncEnumerable())
                yield return item;
        }

        public async Task<TEntity?> CreateAsync(TEntity entity)
        {
            await _dbSet.AddAsync(entity);
            await _dbContext.SaveChangesAsync();
            return entity;
        }

        public async Task UpdateAsync(TEntity entity)
        {
            if (entity == null)
                throw new ArgumentException("Entity not found.");

            _dbContext.Entry(entity).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(TEntity entity)
        {
            if (entity == null)
                throw new ArgumentException("Entity not found.");

            _dbSet.Remove(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _dbSet.FindAsync(id) ?? throw new ArgumentException("Entity not found.");
            _dbSet.Remove(entity);
            await _dbContext.SaveChangesAsync();
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
