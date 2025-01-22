using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Supplier
    {
        [Key]
        public int Supplier_Id { get; set; }
        public string Supplier_Name { get; set; }
        public string Supplier_Address { get; set; }
        public int Tel_number { get; set; }

    }
}
