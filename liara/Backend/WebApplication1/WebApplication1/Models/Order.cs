using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Order
    {
        [Key]
        public int Order_Id { get; set; } 
        public double Total_price { get; set; }
        public DateTime Oreder_date { get; set; }


    }
}
