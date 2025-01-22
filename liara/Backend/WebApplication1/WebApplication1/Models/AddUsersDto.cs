namespace WebApplication1.Models
{
    public class AddUsersDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; } // For secure password storage
        public string UserRole { get; set; }
    }
}
