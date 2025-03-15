using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace YourNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly LiaraDbContext _context;

        public CategoriesController(LiaraDbContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        //{
        //    return await _context.Category.Include(c => c.Products).ToListAsync();
        //}

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _context.Category.ToListAsync();
        }


        // POST: api/Categories
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory(Category category)
        {
            _context.Category.Add(category);
            await _context.SaveChangesAsync();

            // Use CategoryId instead of id
            return CreatedAtAction(nameof(GetCategories), new { id = category.CategoryID }, category);
        }
    }
}
