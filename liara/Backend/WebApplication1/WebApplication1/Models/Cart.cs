using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Cart
    {
        [Key]
        public int Cart_Id { get; set; }
        public int Quantity { get; set; }
    }
}