using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using WebApplication1;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly LiaraDbContext _context;

        public CartController(LiaraDbContext context)
        {
            _context = context;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddToCart([FromBody] CartItem item)
        {
            // You can either create a new Cart or attach to existing guest cart
            var cart = await _context.Cart.Include(c => c.CartItems).FirstOrDefaultAsync()
                       ?? new Cart();

            cart.CartItems.Add(item);

            if (cart.CartID == 0)
                _context.Cart.Add(cart);

            await _context.SaveChangesAsync();
            return Ok(cart);
        }

        [HttpGet("{cartId}")]
        public async Task<IActionResult> GetCart(int cartId)
        {
            var cart = await _context.Cart
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.CartID == cartId);

            return cart == null ? NotFound() : Ok(cart);
        }
    }



}
