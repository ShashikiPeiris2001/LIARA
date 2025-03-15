using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class Color
    {
        [Key]
        public int ColorID { get; set; }  // Primary Key

        public string? ColorName { get; set; }

        public ICollection<Product> Product { get; set; } = new List<Product>();



        public ICollection<ProductColor> ProductColor { get; set; }

        // Foreign Key
        //public int? ProductId { get; set; }

        //// Navigation Property
        //[ForeignKey("ProductId")]
        //public Product Product { get; set; }
    }
}
