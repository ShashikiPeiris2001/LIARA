using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Review
    {
        [Key]
        public int ReviewID { get; set; }  // Primary Key added
        public string comment { get; set; }
        public string Rating { get; set; }

    }
}
