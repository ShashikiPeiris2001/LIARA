using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Order_Item
    {
        [Key]
        public int Order_item_Id { get; set; }
        public string Quantity { get; set; }
        public decimal Sub_Total { get; set; }
    }
}