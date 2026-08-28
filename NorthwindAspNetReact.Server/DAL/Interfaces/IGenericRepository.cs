using Microsoft.EntityFrameworkCore;

namespace NorthwindAspNetReact.Server.DAL.Interfaces
{
    //public interface IEntityRepository<TEntity> : IDisposable where TEntity : class 
    public interface IGenericRepository<TEntity> where TEntity : class 
    {
        public Task<TEntity?> FindAsync(int id);
        //public Task<TEntity?> GetAsync(int id);
        public IQueryable<TEntity?> GetAll();
        public IQueryable<TEntity?> GetAll(Func<TEntity, bool> predicate);
        public IAsyncEnumerable<TEntity?> GetAllAsync();
        public IAsyncEnumerable<TEntity?> GetAllAsync(Func<TEntity, bool> predicate);
        public Task<TEntity?> CreateAsync(TEntity order);
        public Task UpdateAsync(TEntity order);
        public Task DeleteAsync(TEntity order);
        public Task DeleteAsync(int id);
    }
}
