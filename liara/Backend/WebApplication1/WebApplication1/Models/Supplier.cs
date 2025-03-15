using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Supplier
    {
        [Key]
        public int SupplierID { get; set; }
        public string SupplierName { get; set; }
        public string SupplierAddress { get; set; }
        public int TelNumber { get; set; }

    }
}
