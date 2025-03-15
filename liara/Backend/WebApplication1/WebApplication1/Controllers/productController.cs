//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Hosting;
//using Microsoft.AspNetCore.Http;
//using WebApplication1.Models;
//using Microsoft.EntityFrameworkCore;
//using System.IO;
//using System.Threading.Tasks;

//namespace WebApplication1.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ProductController : ControllerBase
//    {
//        private readonly LiaraDbContext _context;
//        private readonly IWebHostEnvironment _environment;

//        public ProductController(LiaraDbContext context, IWebHostEnvironment environment)
//        {
//            _context = context;
//            _environment = environment;
//        }

//        // POST: api/Product (Upload image & save product)
//        [HttpPost]
//        public async Task<IActionResult> PostProduct([FromForm] product product, IFormFile imageFile)
//        {
//            if (product == null || imageFile == null)
//                return BadRequest("Invalid product data or image file");

//            try
//            {
//                // Save Image to wwwroot/images/
//                string uploadsFolder = Path.Combine(_environment.WebRootPath, "images");
//                if (!Directory.Exists(uploadsFolder))
//                {
//                    Directory.CreateDirectory(uploadsFolder);
//                }

//                string uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
//                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

//                using (var fileStream = new FileStream(filePath, FileMode.Create))
//                {
//                    await imageFile.CopyToAsync(fileStream);
//                }

//                // Save file path in database
//                //product.ImagePath = "/images/" + uniqueFileName;

//                _context.Products.Add(product);
//                await _context.SaveChangesAsync();

//                return CreatedAtAction(nameof(GetProduct), new { id = product.ID }, product);
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, "Error saving product: " + ex.Message);
//            }
//        }







//        // GET: api/Product/{id}
//        [HttpGet("{id}")]
//        public async Task<IActionResult> GetProduct(int id)
//        {
//            var product = await _context.Products.FindAsync(id);
//            if (product == null)
//                return NotFound();
//            return Ok(product);
//        }

//        // GET: api/Product (List all products)
//        [HttpGet]
//        public async Task<IActionResult> GetProducts()
//        {
//            var products = await _context.Products.ToListAsync();
//            return Ok(products);
//        }
//    }
//}
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using WebApplication1.Models;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly LiaraDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public ProductController(LiaraDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }



        //[HttpPost]
        //public async Task<IActionResult> Addproduct([FromForm] Product product, [FromForm] List<IFormFile> images, [FromForm] List<string> colors)
        //{
        //    if (product == null || images == null || !images.Any())
        //        return BadRequest("Invalid product data or images");

        //    try
        //    {
        //        // Initialize product navigation properties
        //        product.ProductImages = new List<ProductImage>();
        //        product.ProductColors = new List<Productcolor>();

        //        // Process and add images
        //        foreach (var image in images)
        //        {
        //            using var memoryStream = new MemoryStream();
        //            await image.CopyToAsync(memoryStream);

        //            var productImage = new ProductImage
        //            {
        //                ProductId = product.ID,  // Link image to the product
        //                ImageData = memoryStream.ToArray()
        //            };

        //            product.ProductImages.Add(productImage);
        //        }

        //        // Process and add colors
        //        foreach (var color in colors)
        //        {
        //            var productColor = new Productcolor
        //            {
        //                ProductId = product.ID,  // Link color to the product
        //                Color = color
        //            };

        //            product.ProductColors.Add(productColor);
        //        }

        //        // Save product along with images and colors
        //        _context.Products.Add(product);
        //        await _context.SaveChangesAsync();

        //        return CreatedAtAction(nameof(GetProduct), new { id = product.ID }, product);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, "Error saving product: " + ex.Message);
        //    }
        //}


 

        [HttpGet ("Getproduct")]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _context.Product
                .Include(p => p.ProductImage) // ✅ Includes images
                .Include(p => p.ProductColor) // ✅ Includes colors
                .Include(p => p.ProductSize) // ✅ Includes size
                .ToListAsync();

            var result = products.Select(product => new
            {
                product.ProductID, // ✅ Changed from ID to ProductId (correct property)
                product.Name,
                product.CategoryID, // ✅ Directly using CategoryName as it's a string
                product.SubCategoryID,
                product.Stock,
                product.Price,
                product.Description,
                Color = product.ProductColor.Select(c => c.Color).ToList(),
                Size = product.ProductSize.Select(s => s.Size).ToList(),
                Images = product.ProductImage.Select(img => new
                
                {
                    img.ImageID,
                    Base64Image = Convert.ToBase64String(img.ImageData)
                })
            });

            return Ok(result);
        }



        //[HttpPost("Add-product-details")]
        //public async Task<IActionResult> AddProducts([FromForm] ProductDto productDto)
        //{
        //    if (productDto == null || string.IsNullOrEmpty(productDto.Name) || productDto.Images == null || !productDto.Images.Any() || productDto.Colors == null || !productDto.Colors.Any())
        //    {
        //        return BadRequest("Product details, at least one image, and at least one color are required.");
        //    }

        //    // Create Product Entity
        //    var product = new Product
        //    {
        //        Name = productDto.Name,
        //        CategoryID = productDto.CategoryID,
        //        SubCategoryID = productDto.SubCategoryID,
        //        Stock = productDto.Stock,
        //        Price = productDto.Price,
        //        Description = productDto.Description
        //    };

        //    // Add Product to the database
        //    _context.Product.Add(product);
        //    await _context.SaveChangesAsync();

        //    // Add Product Colors
        //    foreach (var colorName in productDto.Colors)
        //    {
        //        var color = await _context.Color.FirstOrDefaultAsync(c => c.ColorName == colorName);
        //        if (color != null) // Ensure the color exists
        //        {
        //            var productColor = new ProductColor
        //            {
        //                ProductID = product.ProductId,
        //                ColorID = color.ColorID
        //            };
        //            _context.ProductColor.Add(productColor);
        //        }
        //    }
        //    await _context.SaveChangesAsync();

        //    // Add Product Size
        //    foreach (var SizeName in productDto.Sizes)
        //    {
        //        var size = await _context.Size.FirstOrDefaultAsync(c => c.SizeName == SizeName);
        //        if (size != null) // Ensure the size exists
        //        {
        //            var productSize = new ProductSize
        //            {
        //                ProductID = product.ProductId,
        //                SizeID = size.SizeID ?? 0
        //            };
        //            _context.ProductSize.Add(productSize);
        //        }
        //    }
        //    await _context.SaveChangesAsync();


        //    // Add Product Images
        //    foreach (var image in productDto.Images)
        //    {
        //        if (image.Length > 0)
        //        {
        //            using (var memoryStream = new MemoryStream())
        //            {
        //                await image.CopyToAsync(memoryStream);
        //                var productImage = new ProductImage
        //                {
        //                    ProductId = product.ProductId,
        //                    ImageData = memoryStream.ToArray()
        //                };
        //                _context.ProductImage.Add(productImage);
        //            }
        //        }
        //    }

        //    await _context.SaveChangesAsync();

        //    return Ok(new { message = "Product added successfully!" });
        //}

        //public class ProductDto
        //{
        //    public string Name { get; set; }
        //    public int CategoryID { get; set; }
        //    public int SubCategoryID { get; set; }
        //    public int Stock { get; set; }
        //    public decimal Price { get; set; }
        //    public string Description { get; set; }
        //    public List<IFormFile> Images { get; set; }
        //    public List<string> Colors { get; set; }
        //    public List<string> Sizes { get; set; }
        //}

        //[HttpPost("Add-product-details")]
        //public async Task<IActionResult> AddProducts([FromForm] ProductDto productDto)
        //{
        //    // Validate the input
        //    if (productDto == null || string.IsNullOrEmpty(productDto.Name) || productDto.Images == null || !productDto.Images.Any() || productDto.Colors == null || !productDto.Colors.Any())
        //    {
        //        return BadRequest("Product details, at least one image, and at least one color are required.");
        //    }

        //    // Fetch CategoryID based on CategoryName
        //    var category = await _context.Category.FirstOrDefaultAsync(c => c.CategoryName == productDto.CategoryName);
        //    if (category == null)
        //    {
        //        return BadRequest("Invalid Category Name.");
        //    }

        //    // Fetch SubCategoryID based on SubCategoryName
        //    var subCategory = await _context.SubCategory.FirstOrDefaultAsync(sc => sc.SubCategoryName == productDto.SubCategoryName && sc.CategoryID == category.CategoryID);
        //    if (subCategory == null)
        //    {
        //        return BadRequest("Invalid SubCategory Name for the given Category.");
        //    }

        //    // Create Product Entity
        //    var product = new Product
        //    {
        //        Name = productDto.Name,
        //        CategoryID = category.CategoryID, // Use the fetched CategoryID
        //        SubCategoryID = subCategory.SubCategoryID, // Use the fetched SubCategoryID
        //        Stock = productDto.Stock,
        //        Price = productDto.Price,
        //        Description = productDto.Description
        //    };

        //    // Add Product to the database
        //    _context.Product.Add(product);
        //    //await _context.SaveChangesAsync();

        //    // Add Product Colors
        //    foreach (var colorName in productDto.Colors)
        //    {
        //        var color = await _context.Color.FirstOrDefaultAsync(c => c.ColorName == colorName);
        //        if (color != null) // Ensure the color exists
        //        {
        //            var productColor = new ProductColor
        //            {
        //                ProductID = product.ProductId,
        //                ColorID = color.ColorID
        //            };
        //            _context.ProductColor.Add(productColor);
        //        }
        //    }
        //    //await _context.SaveChangesAsync();
        //    // Get all available size names in the database
        //    var availableSizes = await _context.Size.Select(s => s.SizeName).ToListAsync();
        //    Console.WriteLine("Available Sizes in DB: " + string.Join(", ", availableSizes));

        //    foreach (var sizeName in productDto.Sizes)
        //    {
        //        if (!availableSizes.Contains(sizeName))
        //        {
        //            Console.WriteLine($"Error: Size '{sizeName}' not found in the database.");
        //        }
        //    }

        //    // Add Product Size
        //    foreach (var sizeName in productDto.Sizes)
        //    {
        //        var size = await _context.Size.FirstOrDefaultAsync(s => s.SizeName == sizeName);
        //        if (size == null)
        //        {
        //            // Log or throw an error
        //            Console.WriteLine($"Size '{sizeName}' not found in the database.");
        //            continue; // Skip this size
        //        }

        //        var productSize = new ProductSize
        //        {
        //            ProductID = product.ProductId,
        //            SizeID = size.SizeID ?? 0
        //        };
        //        _context.ProductSize.Add(productSize);
        //    }
        //    foreach (var sizeName in productDto.Sizes)
        //    {
        //        Console.WriteLine($"Size being processed: {sizeName}");
        //    }
        //    //await _context.SaveChangesAsync();

        //    // Add Product Images
        //    foreach (var image in productDto.Images)
        //    {
        //        if (image.Length > 0)
        //        {
        //            using (var memoryStream = new MemoryStream())
        //            {
        //                await image.CopyToAsync(memoryStream);
        //                var productImage = new ProductImage
        //                {
        //                    ProductId = product.ProductId,
        //                    ImageData = memoryStream.ToArray()
        //                };
        //                _context.ProductImage.Add(productImage);
        //            }
        //        }
        //    }

        //    await _context.SaveChangesAsync();

        //    return Ok(new { message = "Product added successfully!" });
        //}


        //[HttpPost("Add-product-details")]
        //public async Task<IActionResult> AddProducts([FromForm] ProductDto productDto)
        //{
        //    // Validate the input
        //    if (productDto == null || string.IsNullOrEmpty(productDto.Name) || productDto.Images == null || !productDto.Images.Any() || productDto.Colors == null || !productDto.Colors.Any())
        //    {
        //        return BadRequest("Product details, at least one image, and at least one color are required.");
        //    }

        //    // Fetch CategoryID based on CategoryName
        //    var category = await _context.Category.FirstOrDefaultAsync(c => c.CategoryName == productDto.CategoryName);
        //    if (category == null)
        //    {
        //        return BadRequest("Invalid Category Name.");
        //    }

        //    // Fetch SubCategoryID based on SubCategoryName
        //    var subCategory = await _context.SubCategory.FirstOrDefaultAsync(sc => sc.SubCategoryName == productDto.SubCategoryName && sc.CategoryID == category.CategoryID);
        //    if (subCategory == null)
        //    {
        //        return BadRequest("Invalid SubCategory Name for the given Category.");
        //    }

        //    // Create Product Entity
        //    var product = new Product
        //    {
        //        Name = productDto.Name,
        //        CategoryID = category.CategoryID,
        //        SubCategoryID = subCategory.SubCategoryID,
        //        Stock = productDto.Stock,
        //        Price = productDto.Price,
        //        Description = productDto.Description
        //    };

        //    // Save Product to the database first
        //    _context.Product.Add(product);
        //    await _context.SaveChangesAsync();  // Ensures ProductID is generated

        //    // Retrieve the generated ProductID
        //    int productId = product.ProductId;

        //    // Add Product Colors
        //    foreach (var colorName in productDto.Colors)
        //    {
        //        var color = await _context.Color.FirstOrDefaultAsync(c => c.ColorName == colorName);
        //        if (color != null)
        //        {
        //            var productColor = new ProductColor
        //            {
        //                ProductID = productId,
        //                ColorID = color.ColorID
        //            };
        //            _context.ProductColor.Add(productColor);
        //        }
        //    }

        //    // Add Product Sizes
        //    var availableSizes = await _context.Size.Select(s => s.SizeName).ToListAsync();
        //    foreach (var sizeName in productDto.Sizes)
        //    {
        //        var size = await _context.Size.FirstOrDefaultAsync(s => s.SizeName == sizeName);
        //        if (size != null)
        //        {
        //            var productSize = new ProductSize
        //            {
        //                ProductID = productId,
        //                SizeID = size.SizeID??0
        //            };
        //            _context.ProductSize.Add(productSize);
        //        }
        //    }

        //    // Add Product Images
        //    foreach (var image in productDto.Images)
        //    {
        //        if (image.Length > 0)
        //        {
        //            using (var memoryStream = new MemoryStream())
        //            {
        //                await image.CopyToAsync(memoryStream);
        //                var productImage = new ProductImage
        //                {
        //                    ProductId = productId,
        //                    ImageData = memoryStream.ToArray()
        //                };
        //                _context.ProductImage.Add(productImage);
        //            }
        //        }
        //    }

        //    // Save all related entities
        //    await _context.SaveChangesAsync();

        //    return Ok(new { message = "Product added successfully!", ProductID = productId });
        //}
        //[HttpPost("Add-product-details")]
        //public async Task<IActionResult> AddProducts([FromForm] ProductDto productDto)
        //{
        //    if (productDto == null || string.IsNullOrEmpty(productDto.Name) || productDto.Images == null || !productDto.Images.Any() || productDto.Colors == null || !productDto.Colors.Any() || productDto.Sizes == null || !productDto.Sizes.Any())
        //    {
        //        return BadRequest("Product details, at least one image, color, and size are required.");
        //    }

        //    // Fetch CategoryID based on CategoryName
        //    var category = await _context.Category.FirstOrDefaultAsync(c => c.CategoryName == productDto.CategoryName);
        //    if (category == null)
        //    {
        //        return BadRequest("Invalid Category Name.");
        //    }

        //    // Fetch SubCategoryID based on SubCategoryName
        //    var subCategory = await _context.SubCategory.FirstOrDefaultAsync(sc => sc.SubCategoryName == productDto.SubCategoryName && sc.CategoryID == category.CategoryID);
        //    if (subCategory == null)
        //    {
        //        return BadRequest("Invalid SubCategory Name for the given Category.");
        //    }

        //    //// Get Color IDs for Selected Colors
        //    //var colorEntities = await _context.Color.Where(c => productDto.Colors.Contains(c.ColorName)).ToListAsync();
        //    //if (colorEntities.Count != productDto.Colors.Count)
        //    //{
        //    //    return BadRequest("One or more selected colors do not exist in the database.");
        //    //}

        //    //// Get Size IDs for Selected Sizes
        //    //var sizeEntities = await _context.Size.Where(s => productDto.Sizes.Contains(s.SizeName)).ToListAsync();
        //    //if (sizeEntities.Count != productDto.Sizes.Count)
        //    //{
        //    //    return BadRequest("One or more selected sizes do not exist in the database.");
        //    //}
        //    // Validate Colors
        //    if (productDto.Colors == null || !productDto.Colors.Any())
        //    {
        //        return BadRequest("At least one color is required.");
        //    }

        //    var colorEntities = await _context.Color
        //        .Where(c => productDto.Colors.Select(cn => cn.Trim().ToLower())
        //        .Contains(c.ColorName.Trim().ToLower()))
        //        .ToListAsync();

        //    if (colorEntities.Count != productDto.Colors.Count)
        //    {
        //        return BadRequest("One or more selected colors do not exist in the database.");
        //    }

        //    // Validate Sizes
        //    if (productDto.Sizes == null || !productDto.Sizes.Any())
        //    {
        //        return BadRequest("At least one size is required.");
        //    }

        //    var sizeEntities = await _context.Size
        //        .Where(s => productDto.Sizes.Select(sn => sn.Trim().ToLower())
        //        .Contains(s.SizeName.Trim().ToLower()))
        //        .ToListAsync();

        //    if (sizeEntities.Count != productDto.Sizes.Count)
        //    {
        //        return BadRequest("One or more selected sizes do not exist in the database.");
        //    }



        //    // Create Product Entity but don't save yet
        //    var product = new Product
        //    {
        //        Name = productDto.Name,
        //        CategoryID = category.CategoryID,
        //        SubCategoryID = subCategory.SubCategoryID,
        //        Stock = productDto.Stock,
        //        Price = productDto.Price,
        //        Description = productDto.Description,

        //    };

        //    _context.Product.Add(product);
        //    await _context.SaveChangesAsync(); // Ensure ProductID is generated

        //    // Add Product Colors
        //    foreach (var color in colorEntities)
        //    {
        //        _context.ProductColor.Add(new ProductColor
        //        {
        //            ProductID = product.ProductID,
        //            ColorID = color.ColorID
        //        });
        //    }

        //    // Add Product Sizes
        //    foreach (var size in sizeEntities)
        //    {
        //        _context.ProductSize.Add(new ProductSize
        //        {
        //            ProductID = product.ProductID,
        //            SizeID = size.SizeID?? 0
        //        });
        //    }

        //    // Add Product Images
        //    foreach (var image in productDto.Images)
        //    {
        //        if (image.Length > 0)
        //        {
        //            using (var memoryStream = new MemoryStream())
        //            {
        //                await image.CopyToAsync(memoryStream);
        //                _context.ProductImage.Add(new ProductImage
        //                {
        //                    ProductId = product.ProductID,
        //                    ImageData = memoryStream.ToArray()
        //                });
        //            }
        //        }
        //    }

        //    await _context.SaveChangesAsync(); // Save all related data together

        //    return Ok(new { message = "Product added successfully!", ProductID = product.ProductID });
        //}

        [HttpPost("Addproduct")]
        public async Task<IActionResult> AddProducts([FromForm] ProductDto productDto)
        {
            if (productDto == null || string.IsNullOrEmpty(productDto.Name) || productDto.Images == null || !productDto.Images.Any() || productDto.Colors == null || !productDto.Colors.Any() || productDto.Sizes == null || !productDto.Sizes.Any())
            {
                return BadRequest("Product details, at least one image, color, and size are required.");
            }

            var category = await _context.Category.FirstOrDefaultAsync(c => c.CategoryName == productDto.CategoryName);
            if (category == null)
            {
                return BadRequest("Invalid Category Name.");
            }

            var subCategory = await _context.SubCategory.FirstOrDefaultAsync(sc => sc.SubCategoryName == productDto.SubCategoryName && sc.CategoryID == category.CategoryID);
            if (subCategory == null)
            {
                return BadRequest("Invalid SubCategory Name for the given Category.");
            }

            var colorEntities = await _context.Color
                .Where(c => productDto.Colors.Select(cn => cn.Trim().ToLower()).Contains(c.ColorName.Trim().ToLower()))
                .ToListAsync();

            if (colorEntities.Count != productDto.Colors.Count)
            {
                return BadRequest("One or more selected colors do not exist in the database.");
            }

            var sizeEntities = await _context.Size
                .Where(s => productDto.Sizes.Select(sn => sn.Trim().ToLower()).Contains(s.SizeName.Trim().ToLower()))
                .ToListAsync();

            if (sizeEntities.Count != productDto.Sizes.Count)
            {
                return BadRequest("One or more selected sizes do not exist in the database.");
            }

            var product = new Product
            {
                Name = productDto.Name,
                CategoryID = category.CategoryID,
                SubCategoryID = subCategory.SubCategoryID,
                Stock = productDto.Stock,
                Price = productDto.Price,
                Description = productDto.Description,
            };

            _context.Product.Add(product);
            await _context.SaveChangesAsync(); // Save product first to get ProductID

            // **Save Colors separately in ProductColor table**
            var productColors = colorEntities.Select(color => new ProductColor
            {
                ProductID = product.ProductID,
                ColorID = color.ColorID
            }).ToList();

            _context.ProductColor.AddRange(productColors);
            await _context.SaveChangesAsync(); // Save colors

            // **Save Sizes separately in ProductSize table**
            var productSizes = sizeEntities.Select(size => new ProductSize
            {
                ProductID = product.ProductID,
                SizeID = size.SizeID ?? 0
            }).ToList();

            _context.ProductSize.AddRange(productSizes);
            await _context.SaveChangesAsync(); // Save sizes

            // **Save Product Images**
            foreach (var image in productDto.Images)
            {
                if (image.Length > 0)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await image.CopyToAsync(memoryStream);
                        _context.ProductImage.Add(new ProductImage
                        {
                            ProductId = product.ProductID,
                            ImageData = memoryStream.ToArray()
                        });
                    }
                }
            }

            await _context.SaveChangesAsync(); // Save images

            return Ok(new { message = "Product added successfully!", ProductID = product.ProductID });
        }




        public class ProductDto
        {
            public string? Name { get; set; }
            public string? CategoryName { get; set; } // Changed from CategoryID to CategoryName
            public string? SubCategoryName { get; set; } // Changed from SubCategoryID to SubCategoryName
            public int Stock { get; set; }
            public decimal Price { get; set; }
            public string Description { get; set; }
            public List<IFormFile> Images { get; set; }
            public List<string> Colors { get; set; }
            public List<string> Sizes { get; set; }
        }




    }
}
