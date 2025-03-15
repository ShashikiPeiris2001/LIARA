using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class ProductColor
    {
        
        public int ProductID { get; set; }
        [Key]
        public int ColorID { get; set; }
        public Product Product { get; set; }
        public Color Color { get; set; }  // Fix for missing 'Color'
    }

}
