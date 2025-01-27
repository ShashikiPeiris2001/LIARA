using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace YourNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly LiaraDbContext _context;

        public ProductsController(LiaraDbContext context)
        {
            _context = context;
        }

        // GET: api/Products
        /*[HttpGet]
        public async Task<ActionResult<IEnumerable<product>>> GetProducts()
        {
            return await _context.Products.Include(p => p.Category).ToListAsync();
        }*/


        [HttpGet]
        public async Task<ActionResult<IEnumerable<product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }


        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<product>> PostProduct(product product)
        {
            // Ensure the category exists
            var category = await _context.Category.FindAsync(product.CategoryId);  
            if (category == null)
            {
                return BadRequest("Invalid CategoryId");
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProducts), new { id = product.id }, product);
        }
    }
}
