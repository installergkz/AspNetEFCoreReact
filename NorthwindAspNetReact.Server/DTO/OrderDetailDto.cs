namespace NorthwindAspNetReact.Server.DTO
{
    public record OrderDetailDto
    {
        public int? OrderId { get; init; }
        public int? ProductId { get; init; }
        public string? ProductName { get; init; }
        public decimal? UnitPrice { get; init; }
        public short? Quantity { get; init; }
        public float? Discount { get; init; }
        public int? CategoryId { get; init; }
        public string? CategoryName { get; init; }

        //public virtual Order Order { get; set; }
        //public virtual Product Product { get; set; }
    }
}
