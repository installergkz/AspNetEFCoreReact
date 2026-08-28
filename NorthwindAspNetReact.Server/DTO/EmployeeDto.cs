namespace NorthwindAspNetReact.Server.DTO
{
    public record EmployeeDto
    {
        public int? Id { get; init; }
        public string? LastName { get; init; }
        public string? FirstName { get; init; }
        public string? Title { get; init; }
        public string? TitleOfCourtesy { get; init; }
        public DateTime? BirthDate { get; init; }
        public DateTime? HireDate { get; init; }
        public string? Address { get; init; }
        public string? City { get; init; }
        public string? Region { get; init; }
        public string? PostalCode { get; init; }
        public string? Country { get; init; }
        public string? HomePhone { get; init; }
        public string? Extension { get; init; }
        public byte[]? Photo { get; init; }
        public string? Notes { get; init; }
        public int? ReportsTo { get; init; }
        public string? PhotoPath { get; init; }
        public int? RoleId { get; init; }

        //public virtual ICollection<Employee> InverseReportsToNavigation { get; init; } = new List<Employee>();
        //public virtual ICollection<Order> Orders { get; init; } = new List<Order>();
        //public virtual Employee ReportsToNavigation { get; init; }
        //public virtual ICollection<Territory> Territories { get; init; } = new List<Territory>();
    }
}
