using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    // Models/Cart.cs
    public class Cart
    {
        [Key]
        public int CartID { get; set; }
        public int Quantity { get; set; }
        public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
        
    }
}

    