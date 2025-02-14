﻿using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace WebApplication1.Models
{
    public class User
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } // Primary Key
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? PasswordHash { get; set; } // For secure password storage
        public string? UserRole { get; set; }
    }
}
