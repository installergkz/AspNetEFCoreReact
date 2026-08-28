namespace NorthwindAspNetReact.Server.DTO
{
    public record OrderDto
    {
        public int? Id { get; init; }
        public string? CustomerId { get; init; }
        public int? EmployeeId { get; init; }
        public DateTime? OrderDate { get; init; }
        public DateTime? RequiredDate { get; init; }
        public DateTime? ShippedDate { get; init; }
        public int? ShipVia { get; init; }
        public decimal? Freight { get; init; }
        public string? ShipName { get; init; }
        public string? ShipAddress { get; init; }
        public string? ShipCity { get; init; }
        public string? ShipRegion { get; init; }
        public string? ShipPostalCode { get; init; }
        public string? ShipCountry { get; init; }

        //public virtual Customer Customer { get; init; }
        //public virtual Employee Employee { get; init; }
        //public virtual ICollection<OrderDetail> OrderDetails { get; init; } = new List<OrderDetail>();
    }
}
