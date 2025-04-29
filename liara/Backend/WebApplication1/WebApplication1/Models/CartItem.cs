// Models/CartItem.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    // Models/CartItem.cs
    public class CartItem
    {
        [Key]
        public int CartItemID { get; set; }

        public int ProductID { get; set; }
        public int Quantity { get; set; }

        [NotMapped]
        public string? Name { get; set; }

        [NotMapped]
        public string? ImageUrl { get; set; }

        [NotMapped]
        public decimal Price { get; set; }

        public int CartID { get; set; } // Required for EF relationship
        public Cart Cart { get; set; }
    }
}

