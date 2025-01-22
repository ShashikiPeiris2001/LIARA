
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Models
{
    public class LiaraDbContext : DbContext
    {
        public LiaraDbContext(DbContextOptions<LiaraDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }  // Changed to plural

        public DbSet<Cart> Carts { get; set; }
        public DbSet<Category> Category { get; set; } 
        public DbSet<product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Order_Item> Items { get; set; }
        public DbSet<Reviews> Reviews { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }



        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);
        //}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>()
                .HasMany(c => c.Products)
                .WithOne(p => p.Category)
                .HasForeignKey(p => p.CategoryId)
                .OnDelete(DeleteBehavior.Cascade); // Optional: Define delete behavior
        }

    }
}