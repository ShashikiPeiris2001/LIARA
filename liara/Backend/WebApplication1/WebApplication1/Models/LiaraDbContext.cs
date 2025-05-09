﻿
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Models
{
    public class LiaraDbContext : IdentityDbContext
    {
        public LiaraDbContext(DbContextOptions<LiaraDbContext> options) : base(options) { }

        public DbSet<Users> Users { get; set; }  // Changed to plural

        public DbSet<Cart> Cart { get; set; }
        public DbSet<CartItem> CartItem { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<SubCategory> SubCategory { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<ProductImage> ProductImage { get; set; }
        public DbSet<Orders> Orders { get; set; }
        public DbSet<OrderItem> OrderItem { get; set; }
        public DbSet<PlaceOrderView> PlaceOrderView { get; set; }
        public DbSet<Review> Review { get; set; }
        public DbSet<Supplier> Supplier { get; set; }
        public DbSet<Color> Color { get; set; }
        public DbSet<Size> Size { get; set; }
        public DbSet<ProductColor> ProductColor { get; set; }
        public DbSet<ProductSize> ProductSize { get; set; }
        public DbSet<ProductSupplier> ProductSupplier { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasKey(p => p.ProductID);  // Ensure EF knows the correct PK

            modelBuilder.Entity<Color>()
                .HasKey(c => c.ColorID);

            modelBuilder.Entity<Size>()
                .HasKey(s => s.SizeID);
            // Define the many-to-many relationship
            modelBuilder.Entity<ProductColor>()
                .HasKey(pc => new { pc.ProductID, pc.ColorID });  // Composite Key

            modelBuilder.Entity<ProductColor>()
                .HasOne(pc => pc.Product)
                .WithMany(p => p.ProductColor)
                .HasForeignKey(pc => pc.ProductID);

            modelBuilder.Entity<ProductColor>()
                .HasOne(pc => pc.Color)
                .WithMany(c => c.ProductColor)
                .HasForeignKey(pc => pc.ColorID);

            base.OnModelCreating(modelBuilder);

            // Define the many-to-many relationship
            modelBuilder.Entity<ProductSize>()
                .HasKey(ps => new { ps.ProductID, ps.SizeID });  // Composite Key

            modelBuilder.Entity<ProductSize>() 
                .HasOne(ps => ps.Product)
                .WithMany(p => p.ProductSize)
                .HasForeignKey(ps => ps.ProductID);

            modelBuilder.Entity<ProductSize>()
                .HasOne(ps => ps.Size)
                .WithMany(s => s.ProductSize)
                .HasForeignKey(ps => ps.SizeID);

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ProductSupplier>()
                .HasKey(ps => new { ps.ProductID, ps.SupplierID });

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>()
               .HasOne(p => p.Category) // ✅ One Product has One Category
               .WithMany(c => c.Product) // ✅ One Category has Many Products
               .HasForeignKey(p => p.CategoryID); // ✅ Foreign Key

            modelBuilder.Entity<Category>()
            .HasMany(c => c.SubCategory)
            .WithOne(s => s.Category)
            .HasForeignKey(s => s.CategoryID);
        }

        }

    }
    