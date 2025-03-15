using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class OrderItem
    {
        [Key]
        public int OrderItemID { get; set; }
        public string Quantity { get; set; }
        public decimal SubTotal { get; set; }
    }
}