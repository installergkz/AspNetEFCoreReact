namespace NorthwindAspNetReact.Server.Services.Interfaces
{
    public interface IGenericService<TEntity> where TEntity : class
    {
        public IGenericRepository<TEntity> GenericRepository { get; }

        //public Task<TEntity?> FindAsync(int id);
        //public Task<TEntity?> GetAsync(int id);
        //public Task<IQueryable<TEntity?>> GetAll();
        //public Task<IQueryable<TEntity?>> GetAll(Func<TEntity, bool> predicate);
        //public IAsyncEnumerable<TEntity> GetAllAsync();
        //public IAsyncEnumerable<TEntity> GetAllAsync(Func<TEntity, bool> predicate);
        //public Task<TEntity?> CreateAsync(TEntity order);
        //public Task UpdateOrderAsync(TEntity order);
        //public Task DeleteAsync(TEntity order);
        //public Task DeleteAsync(int id);
    }
}
