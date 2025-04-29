using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class Orders
    {
        [Key]
        public int OrderID { get; set; } 
        public double Totalprice { get; set; }
        public DateTime OrderDate { get; set; }

        // Foreign key to user
        //public string UserId { get; set; }

        // FK → PlaceOrder
        public int PlaceOrderViewID { get; set; }
        public PlaceOrderView PlaceOrdersView { get; set; }


        // Navigation property
        public ICollection<OrderItem> OrderItems { get; set; }
    }
}
