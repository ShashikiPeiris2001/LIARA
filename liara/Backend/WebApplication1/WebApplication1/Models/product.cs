using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace WebApplication1.Models
{
    public class Product
    {
        [Key]
        public int ProductID { get; set; } // Primary Key
        public string? Name { get; set; }

        //Foreign Key to Category
        public int? CategoryID { get; set; }
        // Foreign Key to SubCategory
        public int? SubCategoryID { get; set; }
        // Foreign Key to Color
        public int? ColorID { get; set; }
        // Foreign Key to Size
        public int? SizeID { get; set; }
        public int? Stock { get; set; }
        public decimal? Price { get; set; }
        public string? Description { get; set; }
        public ICollection<ProductImage> ProductImage { get; set; } = new List<ProductImage>(); // Fix for missing 'ProductImage'
        public ICollection<ProductColor> ProductColor { get; set; } = new List<ProductColor>(); // Fix for missing 'ProductColor'
        public ICollection<ProductSize> ProductSize { get; set; } = new List<ProductSize>(); // Fix for missing 'ProductSize'

        //    // Navigation Property for Category
        //    [ForeignKey("CategoryId")]
        //    public Category Category { get; set; }

        //    // Navigation Property for SubCategory
        //    [ForeignKey("SubCategoryId")]
        //    public SubCategory SubCategory { get; set; }

        //    // Navigation Property for Images
        //    public virtual ICollection<ProductImage> ProductImages { get; set; } = new List<ProductImage>();

        //    // Navigation Property for Colors
        //    public virtual ICollection<Productcolor> ProductColors { get; set; } = new List<Productcolor>();
        // }
    }
}




