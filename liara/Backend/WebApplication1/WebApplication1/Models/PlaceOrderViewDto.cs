using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class PlaceOrderViewDto
    {
        [Required] public string FirstName { get; set; }
        [Required] public string LastName { get; set; }
        [Required] public string Address { get; set; }
        [Required] public string City { get; set; }
        [Required] public string PostalCode { get; set; }
        public string Phone { get; set; }
        [Required, EmailAddress] public string Email { get; set; }

        // Payment method – e.g. "cod", "card", etc.
        [Required] public string PaymentMethod { get; set; }

        [Required] public decimal Totalprice { get; set; }

        public List<CartItemDto> CartItems { get; set; }
    }
}
