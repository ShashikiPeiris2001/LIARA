//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using WebApplication1.Models;

//namespace YourNamespace.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class CategoriesController : ControllerBase
//    {
//        private readonly LiaraDbContext _context;

//        public CategoriesController(LiaraDbContext context)
//        {
//            _context = context;
//        }

//        // GET: api/Categories
//        //[HttpGet]
//        //public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
//        //{
//        //    return await _context.Category.Include(c => c.Products).ToListAsync();
//        //}

//        [HttpPost("Addcategory")]
//        public async Task<ActionResult<Category>> AddCategoryWithSubcategories(Category category)
//        {
//            if (category == null || string.IsNullOrWhiteSpace(category.CategoryName))
//            {
//                return BadRequest("Category name is required.");
//            }

//            if (category.SubCategory != null && category.SubCategory.Any())
//            {
//                foreach (var subCategory in category.SubCategory)
//                {
//                    _context.SubCategory.Add(subCategory);
//                }
//            }

//            _context.Category.Add(category);
//            await _context.SaveChangesAsync();

//            return CreatedAtAction(nameof(GetCategories), new { id = category.CategoryID }, category);
//        }
//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
//        {
//            var categories = await _context.Category
//                .Include(c => c.SubCategory) // Ensure subcategories are included
//                .Select(c => new
//                {
//                    id = c.CategoryID,
//                    name = c.CategoryName,
//                    subCategories = c.SubCategory.Select(sc => new
//                    {
//                        id = sc.SubCategoryID,
//                        name = sc.SubCategoryName
//                    }).ToList()
//                })
//                .ToListAsync();

//            return Ok(categories);
//        }


//    }
//}
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Controllers
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

        // GET: api/Categories - Get all categories with their subcategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetCategories()
        {
            var categories = await _context.Category
                .Include(c => c.SubCategory) // Include subcategories
                .Select(c => new
                {
                    id = c.CategoryID,
                    name = c.CategoryName,
                    subCategories = c.SubCategory.Select(sc => new
                    {
                        id = sc.SubCategoryID,
                        name = sc.SubCategoryName
                    }).ToList()
                })
                .ToListAsync();

            if (categories == null || !categories.Any())
            {
                return NotFound("No categories found.");
            }

            return Ok(categories);
        }

        // POST: api/Categories/AddCategory - Add a category with optional subcategories
        //[HttpPost("AddCategory")]
        //public async Task<ActionResult<Category>> AddCategoryWithSubcategories([FromBody] Category category)
        //{
        //    if (category == null || string.IsNullOrWhiteSpace(category.CategoryName))
        //    {
        //        return BadRequest("Category name is required.");
        //    }

        //    if (await _context.Category.AnyAsync(c => c.CategoryName == category.CategoryName))
        //    {
        //        return Conflict("Category already exists.");
        //    }

        //    // Ensure subcategories are not null
        //    if (category.SubCategory == null)
        //    {
        //        category.SubCategory = new List<SubCategory>();
        //    }

        //    // Add category to DB and save it first
        //    _context.Category.Add(category);
        //    await _context.SaveChangesAsync(); // This assigns CategoryID

        //    // Ensure subcategories are linked to the saved category
        //    foreach (var subCategory in category.SubCategory)
        //    {
        //        subCategory.CategoryID = category.CategoryID; // Assign CategoryID explicitly
        //        _context.SubCategory.Add(subCategory);
        //    }

        //    await _context.SaveChangesAsync(); // Save subcategories

        //    return CreatedAtAction(nameof(GetCategories), new { id = category.CategoryID }, category);
        //}

        [HttpPost("AddCategory")]
        public async Task<ActionResult<Category>> AddCategoryWithSubcategories([FromBody] Category category)
        {
            if (category == null || string.IsNullOrWhiteSpace(category.CategoryName))
            {
                return BadRequest("Category name is required.");
            }

            if (await _context.Category.AnyAsync(c => c.CategoryName == category.CategoryName))
            {
                return Conflict("Category already exists.");
            }

            // Ensure subcategories are initialized
            if (category.SubCategory == null)
            {
                category.SubCategory = new List<SubCategory>();
            }

            // Add category with subcategories (EF Core automatically tracks them)
            _context.Category.Add(category);
            await _context.SaveChangesAsync(); // Saves category and subcategories together

            return CreatedAtAction(nameof(GetCategories), new { id = category.CategoryID }, category);
        }

        // GET: api/Categories/{id} - Get a single category with its subcategories
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetCategoryById(int id)
        {
            var category = await _context.Category
                .Include(c => c.SubCategory)
                .Where(c => c.CategoryID == id)
                .Select(c => new
                {
                    id = c.CategoryID,
                    name = c.CategoryName,
                    subCategories = c.SubCategory.Select(sc => new
                    {
                        id = sc.SubCategoryID,
                        name = sc.SubCategoryName
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (category == null)
            {
                return NotFound($"Category with ID {id} not found.");
            }

            return Ok(category);
        }
        [HttpGet("SubCategories/{categoryId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetSubCategories(int categoryId)
        {
            var subCategories = await _context.SubCategory
                .Where(sc => sc.CategoryID == categoryId)
                .Select(sc => new
                {
                    id = sc.SubCategoryID,
                    name = sc.SubCategoryName
                })
                .ToListAsync();

            if (!subCategories.Any())
            {
                return NotFound($"No subcategories found for Category ID {categoryId}.");
            }

            return Ok(subCategories);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            try
            {
                var category = await _context.Category
                    .Include(c => c.SubCategory) // Include subcategories to ensure deletion of related records
                    .FirstOrDefaultAsync(c => c.CategoryID == id);

                if (category == null)
                {
                    return NotFound(new { message = "Category not found" });
                }

                // Remove all associated subcategories
                _context.SubCategory.RemoveRange(category.SubCategory);

                // Remove the category
                _context.Category.Remove(category);

                await _context.SaveChangesAsync();

                return Ok(new { message = "Category and its subcategories deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }

}

