namespace WebApplication1.Models
{
    public class Size
    {
        public int? SizeID { get; set; }
        public string? SizeName { get; set; }

        public ICollection<Product> Product { get; set; } = new List<Product>();
        //public ICollection<Product> ProductSize { get;se
        public ICollection<ProductSize> ProductSize { get; set; }
    }
}
