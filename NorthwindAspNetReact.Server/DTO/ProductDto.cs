namespace NorthwindAspNetReact.Server.DTO
{
    public record ProductDto
    {
        public int? Id { get; init; }
        public string? Name { get; init; }
        public int? SupplierId { get; init; }
        public int? CategoryId { get; init; }
        public string? QuantityPerUnit { get; init; }
        public decimal? UnitPrice { get; init; }
        public short? UnitsInStock { get; init; }
        public short? UnitsOnOrder { get; init; }
        public short? ReorderLevel { get; init; }
        public bool? Discontinued { get; init; }

        //public virtual Category Category { get; init; }
        //public virtual ICollection<OrderDetail> OrderDetails { get; init; } = new List<OrderDetail>();
        //public virtual Supplier Supplier { get; init; }
    }
}
