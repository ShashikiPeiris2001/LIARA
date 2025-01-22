using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace WebApplication1.Models
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }  // Primary Key

        public string CategoryName { get; set; }
        public string Category_Description { get; set; }
        public string Sub_Category { get; set; }

        // Navigation property to Products
        public ICollection<product>? Products { get; set; }
    }
}
