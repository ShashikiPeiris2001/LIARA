using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace WebApplication1.Models
{
    public class Category
    {
        [Key]
        public int CategoryID { get; set; }// Primary Key
        public string? CategoryName { get; set; } 
        
        public ICollection<Product> Product { get; set; } = new List<Product>();

        // Add list of SubCategories
        public ICollection<SubCategory> SubCategory { get; set; } = new List<SubCategory>();

    }
}
