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
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WebApplication1.Models;


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




        //[HttpGet ("Getproduct")]
        //public async Task<IActionResult> GetProducts()
        //{
        //    var products = await _context.Product
        //        .Include(p => p.ProductImage) // ✅ Includes images
        //        .Include(p => p.ProductColor) // ✅ Includes colors
        //        .Include(p => p.ProductSize) // ✅ Includes size
        //        .ToListAsync();

        //    var result = products.Select(product => new
        //    {
        //        product.ProductID, // ✅ Changed from ID to ProductId (correct property)
        //        product.Name,
        //        product.CategoryID, // ✅ Directly using CategoryName as it's a string
        //        product.SubCategoryID,
        //        product.Stock,
        //        product.Price,
        //        product.Description,
        //        Color = product.ProductColor.Select(c => c.Color).ToList(),
        //        Size = product.ProductSize.Select(s => s.Size).ToList(),
        //        Images = product.ProductImage.Select(img => new

        //        {
        //            img.ImageID,
        //            Base64Image = Convert.ToBase64String(img.ImageData)
        //        })
        //    });


        //    return Ok(result);
        //}

        [HttpGet("Getproduct")]
        public async Task<IActionResult> GetProducts([FromQuery] int? categoryId = null)
        {
            var query = _context.Product
                .Include(p => p.ProductImage) // ✅ Includes images
                .Include(p => p.ProductColor) // ✅ Includes colors
                .Include(p => p.ProductSize) // ✅ Includes size
                .Include(p => p.Category) // ✅ Include the Category table to get the Category Name
                .AsQueryable();

            // Filter by CategoryID if provided (for example, 'Women' category)
            if (categoryId.HasValue)
            {
                query = query.Where(p => p.CategoryID == categoryId.Value);
            }

            var products = await query.ToListAsync();

            var result = products.Select(product => new
            {
                ProductID = product.ProductID, // ✅ Changed from ID to ProductId (correct property)
                Name = product.Name,
                CategoryID = product.CategoryID, // ✅ Directly using CategoryName as it's a string
                CategoryName = product.Category != null ? product.Category.CategoryName : "Unknown", // ✅ Get category name
                SubCategoryID = product.SubCategoryID,
                Stock = product.Stock,
                Price = product.Price,
                Description = product.Description,
                Color = product.ProductColor.Select(c => c.Color).ToList(),
                Size = product.ProductSize.Select(s => s.Size).ToList(),
                Images = product.ProductImage.Select(img => new
                {
                    img.ImageID,
                    Base64Image = img.ImageData != null ? Convert.ToBase64String(img.ImageData) : null
                }).ToList()
            }).ToList();
            Console.WriteLine("Response JSON: " + JsonConvert.SerializeObject(result));
            return Ok(result);

        }

        [HttpGet("GetAllProducts")]
        public async Task<IActionResult> GetAllProducts()
        {
            try
            {
                var products = await _context.Product
                    .Include(p => p.ProductImage) // ✅ Includes images
                    .Include(p => p.ProductColor) // ✅ Includes colors
                        .ThenInclude(pc => pc.Color) // ✅ Include nested Color
                    .Include(p => p.ProductSize) // ✅ Includes sizes
                         .ThenInclude(ps => ps.Size) // ✅ Include nested Size
                    .Include(p => p.Category) // ✅ Includes the Category table
                    .ToListAsync();

                if (products == null || products.Count == 0)
                {
                    return NotFound("No products found.");
                }

                var result = products.Select(product => new
                {
                    ProductID = product.ProductID,
                    Name = product.Name ?? "No Name Available",
                    CategoryID = product.CategoryID,
                    CategoryName = product.Category?.CategoryName ?? "Uncategorized",
                    SubCategoryID = product.SubCategoryID,
                    Stock = product.Stock,
                    Status = product.Stock == 0 ? "Sold Out" : "Available", // 👈 Update logic here
                    Price = product.Price ?? 0,
                    Description = product.Description,
                    Colors = product.ProductColor.Select(c => new
                    {
                        ColorID = c.Color.ColorID,
                        Name = c.Color.ColorName,
                        //Hex = c.Color.HexCode // Optional, if you have it
                    }).ToList(),
                    Sizes = product.ProductSize.Select(ps => new
                    {
                        SizeID = ps.Size.SizeID,
                        Name = ps.Size.SizeName
                    }).ToList(),
                    Images = product.ProductImage.Select(img => new
                    {
                        img.ImageID,
                        Base64Image = img.ImageData != null ? Convert.ToBase64String(img.ImageData) : null
                    }).ToList()
                }).ToList();


                Console.WriteLine("Response JSON: " + JsonConvert.SerializeObject(result));
                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error in GetAllProducts: " + ex.Message);
                return StatusCode(500, "An error occurred while fetching products.");
            }
        }

        [HttpPut("ReduceStock/{productId}")]
        public async Task<IActionResult> ReduceStock(int productId, [FromBody] int quantity)
        {
            var product = await _context.Product.FindAsync(productId);
            if (product == null)
                return NotFound("Product not found.");

            if (product.Stock < quantity)
                return BadRequest("Not enough stock.");

            product.Stock -= quantity;
            if (product.Stock == 0)
                product.Status = "Sold Out";

            // Update fields
            product.Name = product.Name;
            product.CategoryID = product.CategoryID;
            product.SubCategoryID = product.SubCategoryID;
            product.Stock = product.Stock;
            product.Price = product.Price;
            product.Description = product.Description;

            // Update Status based on Stock
            product.Status = product.Stock > 0 ? "Available" : "Sold Out";

            
            await _context.SaveChangesAsync();
            return Ok("Stock updated.");
        }



        [HttpGet("GetLatestProducts")]
        public async Task<IActionResult> GetLatestProducts()
        {
            try
            {
                var products = await _context.Product
                    .Include(p => p.ProductImage)
                    .Include(p => p.ProductColor)
                    .Include(p => p.ProductSize)
                    .Include(p => p.Category)
                    .OrderByDescending(p => p.ProductID) // Get latest added products
                    .Take(8) // Take only the last 8 products
                    .ToListAsync();

                if (products == null || products.Count == 0)
                {
                    return NotFound("No products found.");
                }

                var result = products.Select(product => new
                {
                    ProductID = product.ProductID,
                    Name = product.Name ?? "No Name Available",
                    CategoryID = product.CategoryID,
                    CategoryName = product.Category != null ? product.Category.CategoryName : "Uncategorized",
                    SubCategoryID = product.SubCategoryID,
                    Stock = product.Stock,
                    Price = product.Price ?? 0,
                    Description = product.Description,
                    Colors = product.ProductColor.Select(c => c.Color).ToList(),
                    Sizes = product.ProductSize.Select(s => s.Size).ToList(),
                    Images = product.ProductImage.Select(img => new
                    {
                        img.ImageID,
                        Base64Image = img.ImageData != null ? Convert.ToBase64String(img.ImageData) : null
                    }).ToList()
                }).ToList();

                Console.WriteLine("Response JSON: " + JsonConvert.SerializeObject(result));
                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error in GetLatestProducts: " + ex.Message);
                return StatusCode(500, "An error occurred while fetching products.");
            }
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _context.Product
                .Where(p => p.ProductID == id)
                .Select(p => new
                {
                    id = p.ProductID,
                    name = p.Name,
                    price = p.Price,
                    description = p.Description,
                    colors = p.ProductColor.Select(pc => new
                    {
                        colorID = pc.Color.ColorID,
                        color = pc.Color.ColorName,
                        //hex = pc.Color.HexCode // Assuming there's a HexCode or similar field
                    }).ToList(),
                    images = _context.ProductImage
                        .Where(img => img.ProductId == id)
                        .Select(img => Convert.ToBase64String(img.ImageData))
                        .ToList()
                })
                .FirstOrDefaultAsync();

            if (product == null)
            {
                return NotFound(new { message = "Product not found" });
            }

            return Ok(product);
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
        [HttpDelete("DeleteProduct/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try
            {
                var product = await _context.Product.FindAsync(id);
                if (product == null)
                {
                    return NotFound(new { message = "Product not found" });
                }

                _context.Product.Remove(product);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Product deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error deleting product", error = ex.Message });
            }
        }


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
        Status = productDto.Stock > 0 ? "Available" : "Sold Out"
    };

    _context.Product.Add(product);
    await _context.SaveChangesAsync(); // Save to get ProductID

    // Save colors
    var productColors = colorEntities.Select(color => new ProductColor
    {
        ProductID = product.ProductID,
        ColorID = color.ColorID
    }).ToList();
    _context.ProductColor.AddRange(productColors);

    // Save sizes
    var productSizes = sizeEntities.Select(size => new ProductSize
    {
        ProductID = product.ProductID,
        SizeID = size.SizeID ?? 0
    }).ToList();
    _context.ProductSize.AddRange(productSizes);

    await _context.SaveChangesAsync(); // Save colors and sizes

    // Save product images
    foreach (var image in productDto.Images)
    {
        if (image.Length > 0)
        {
            using var memoryStream = new MemoryStream();
            await image.CopyToAsync(memoryStream);
            var productImage = new ProductImage
            {
                ProductId = product.ProductID,
                ImageData = memoryStream.ToArray(), // Store image as byte array
            };
            _context.ProductImage.Add(productImage);
        }
    }

    await _context.SaveChangesAsync(); // Save images

    return Ok(new { message = "Product added successfully!" });
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

        public class ImageDto
        {
            public int? ImageID { get; set; }
            public string Base64Image { get; set; }
        }



    }
}
