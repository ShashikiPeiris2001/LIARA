using Microsoft.EntityFrameworkCore;
using LIARA.Models;

namespace LIARA.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }  // Example table, add more as needed
    }
}