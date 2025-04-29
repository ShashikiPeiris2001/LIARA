// Models/PlaceOrder.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("PlaceOrderView")]
    public class PlaceOrderView
    {
        [Key]
        public int PlaceOrderViewID { get; set; }

        [Required] public string FirstName { get; set; }
        [Required] public string LastName { get; set; }
        [Required] public string Address { get; set; }
        [Required] public string City { get; set; }
        [Required] public string PostalCode { get; set; }
        public string Phone { get; set; }
        [Required] public string Email { get; set; }

        // Navigation: one customer → many orders
        public ICollection<Orders> Orders { get; set; }
    }
}
