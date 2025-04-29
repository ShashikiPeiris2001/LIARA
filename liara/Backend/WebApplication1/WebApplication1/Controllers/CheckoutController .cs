//using Microsoft.EntityFrameworkCore;
//using Microsoft.AspNetCore.Mvc;
//using WebApplication1.Models;


//namespace WebApplication1.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]

//    public class CheckoutController : ControllerBase
//    {
//        private readonly LiaraDbContext _context;

//        public CheckoutController(LiaraDbContext context)
//        {
//            _context = context;
//            
//        }

//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<object>>> GetCheckout()
//        {
//            var cart = HttpContext.Session.GetObjectFromJson<List<CartItem>>("Cart");
//            var viewModel = new PlaceOrderView
//            {
//                CartItems = cart,
//                Total = cart.Sum(x => x.Price * x.Quantity)
//            };
//            return View(viewModel);
//        }

//        [HttpPost]
//        public async Task<IActionResult> PlaceOrder(PlaceOrderView model)
//        {
//            var user = await _userManager.GetUserAsync(User);

//            if (!ModelState.IsValid || user == null)
//                return View("Index", model);

//            var order = new Orders
//            {
//                OrederDate = DateTime.Now,
//                Totalprice = (double)model.Total,
//                UserId = user.Id,
//                OrderItems = new List<OrderItem>()
//            };

//            foreach (var item in model.CartItems)
//            {
//                var product = await _context.Product.FindAsync(item.ProductId);
//                var orderItem = new OrderItem
//                {
//                    ProductID = product.ProductID,
//                    Quantity = item.Quantity,
//                    SubTotal = item.Quantity * product.Price.Value
//                };
//                order.OrderItems.Add(orderItem);

//                product.Stock -= item.Quantity;
//            }

//            _context.Orders.Add(order);
//            await _context.SaveChangesAsync();

//            // Clear cart
//            HttpContext.Session.Remove("Cart");

//            return RedirectToAction("Success");
//        }

//        public IActionResult Success()
//        {
//            return View();
//        }
//    }

//}
// Controllers/CheckoutController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]                      // Protects all endpoints in this controller
    public class CheckoutController : ControllerBase
    {
        private readonly LiaraDbContext _context;

        public CheckoutController(LiaraDbContext context)
        {
            _context = context;
        }

        [HttpPost("PlaceOrder")]
        public async Task<IActionResult> PlaceOrder([FromBody] PlaceOrderViewDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            using var tx = await _context.Database.BeginTransactionAsync();
            try
            {
                // 1) Save customer info
                var customer = new PlaceOrderView
                {
                    FirstName = dto.FirstName,
                    LastName = dto.LastName,
                    Address = dto.Address,
                    City = dto.City,
                    PostalCode = dto.PostalCode,
                    Phone = dto.Phone,
                    Email = dto.Email
                };
                _context.PlaceOrderView.Add(customer);
                await _context.SaveChangesAsync();

                // 2) Create the order
                var order = new Orders
                {
                    PlaceOrderViewID = customer.PlaceOrderViewID,
                    Totalprice = (double)dto.Totalprice,
                    OrderDate = DateTime.UtcNow,
                    OrderItems = dto.CartItems.Select(ci => new OrderItem
                    {
                        ProductID = ci.ProductId,
                        Quantity = ci.Quantity,
                        SubTotal = ci.Price * ci.Quantity
                    }).ToList()
                };
                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                await tx.CommitAsync();

                return Ok(new { message = "Order placed successfully", orderId = order.OrderID });
            }
            catch (Exception ex)
            {
                await tx.RollbackAsync();
                return StatusCode(500, new
                {
                    message = "Failed to place order",
                    detail = ex.Message,
                    stack = ex.StackTrace
                });
            }
        }
    }
}

