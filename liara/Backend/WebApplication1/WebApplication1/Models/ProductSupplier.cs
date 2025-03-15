using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class ProductSupplier
    {
        
        public int ProductID { get; set; }
        
        public int SupplierID { get; set; }
        public Product Product { get; set; }
        public Supplier Supplier { get; set; }
    }
}
