using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class ProductSize
    {
      
        public int ProductID { get; set; }
        [Key]
        public int SizeID { get; set; } // Primary Key
        public Product Product { get; set; }
        public Size Size { get; set; }  // Fix for missing 'Size'
    }
}
