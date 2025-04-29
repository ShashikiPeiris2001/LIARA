using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class OrderItem
    {
        [Key]
        public int OrderItemID { get; set; }
        public int Quantity { get; set; }
        public decimal SubTotal { get; set; }
        // Foreign key to Orders
        public int OrderID { get; set; }
        public Orders Order { get; set; }

        // Foreign key to Product
        public int ProductID { get; set; }
        public Product Product { get; set; }
    }
}