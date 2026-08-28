namespace ServicesProject.DAL.Interfaces
{
    public interface IDataBaseWorker : IDisposable
    {
        //public IDbConnection Connection { get; set; }

        public IDbConnection CreateConnection();
    }
}
