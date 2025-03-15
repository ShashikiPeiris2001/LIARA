using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Orders
    {
        [Key]
        public int OrderID { get; set; } 
        public double Totalprice { get; set; }
        public DateTime OrederDate { get; set; }


    }
}
