using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Reviews
    {
        [Key]
        public int Id { get; set; }  // Primary Key added
        public string comment { get; set; }
        public string rating { get; set; }

    }
}
