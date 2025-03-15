using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace WebApplication1.Models
{
    public class Users
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserID { get; set; } // Primary Key
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? PasswordHash { get; set; } // For secure password storage
        public string? Role { get; set; }
    }
}
