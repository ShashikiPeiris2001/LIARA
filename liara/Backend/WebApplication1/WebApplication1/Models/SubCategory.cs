using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class SubCategory
    {
        [Key]
        public int SubCategoryID { get; set; } //Primary key
        public string? SubCategoryName { get; set; }

        public ICollection<Product> Product { get; set; } = new List<Product>();
        // Foreign key to Category
        public int CategoryID { get; set; } // Add this property
        public Category Category { get; set; } = null!;


    }
}
