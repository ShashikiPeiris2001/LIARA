/*using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class ProductImage
    {
        [Key]
        public int Imageid { get; set; }

        public int ProductId { get; set; }

        public byte[] ImageData { get; set; }

       

        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }
    }
}
*/
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class ProductImage
    {
        [Key]
        public int? ImageID { get; set; }  // Primary Key

        // Foreign Key
        public int? ProductId { get; set; }

        public byte[] ImageData { get; set; }

        // Navigation Property
        //[ForeignKey("ProductId")]
        public Product Product { get; set; }
    }
}

