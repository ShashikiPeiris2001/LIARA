using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class product
    {
        internal object id;

        [Key]
        public int? product_id {  get; set; }
        public string? product_name { get; set; }
        public decimal? Price { get; set; }
        public int? Stock { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }

       public int? CategoryId { get; set; } // Foreign Key

        // Navigation property to Categories
        //public Category? Category { get; set; }
    }
}
