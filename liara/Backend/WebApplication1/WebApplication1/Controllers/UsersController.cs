/*using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly LiaraDbContext _dbContext;
        private readonly IPasswordHasher<User> _passwordHasher;

        public UsersController(LiaraDbContext dbContext, IPasswordHasher<User> passwordHasher)
        {
            _dbContext = dbContext;
            _passwordHasher = passwordHasher;
        }

        // Get all users
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _dbContext.Users.Select(user => new
            {
                user.Id,
                user.Username,
                user.Email,
                user.UserRole
            }).ToList();
            return Ok(users);
        }

        // User registration (SignUp)
        *//* [HttpPost("register")]
         public async Task<IActionResult> Register([FromBody] User addUsersDto)
         {
             if (_dbContext.Users.Any(u => u.Email == addUsersDto.Email))
             {
                 return BadRequest(new { Message = "Email already exists" });
             }

             var user = new User
             {
                 Username = addUsersDto.Username,
                 Email = addUsersDto.Email,
                 UserRole = addUsersDto.UserRole,
             };

             user.PasswordHash = _passwordHasher.HashPassword(user, addUsersDto.PasswordHash);

             await _dbContext.Users.AddAsync(user);
             await _dbContext.SaveChangesAsync();

             return Ok(new { Message = "User registered successfully" });
         }*//*


        [HttpPost("register-users")]
        public async Task<ActionResult<User>> Postuser(User userDetails)
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(userDetails.Username) ||
                string.IsNullOrWhiteSpace(userDetails.Email) ||
                string.IsNullOrWhiteSpace(userDetails.PasswordHash))
            {
                return BadRequest("All fields are required.");
            }

            // Assign default role if not provided
            if (string.IsNullOrEmpty(userDetails.UserRole))
            {
                userDetails.UserRole = "User"; // Default role
            }

            // Add the user to the database
            _dbContext.Users.Add(userDetails);
            await _dbContext.SaveChangesAsync();

            // Return the created user (without sensitive information)
            return CreatedAtAction(nameof(Postuser), new { id = userDetails.Id }, new
            {
                userDetails.Id,
                userDetails.Username,
                userDetails.Email,
                userDetails.UserRole
            });
        }








        [HttpPost]
        public async Task<IActionResult> PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check for null or invalid data
            if (string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.Email))
            {
                return BadRequest("Username and Email are required.");
            }

            // Avoid direct assignment of PasswordHash
            user.PasswordHash = null; // Or use Identity's password hashing mechanism if applicable

            try
            {
                _dbContext.Users.Add(user);
                await _dbContext.SaveChangesAsync();

                // Return a filtered response to avoid exposing sensitive data
                return CreatedAtAction(nameof(PostUser), new { id = user.Id }, new
                {
                    user.Id,
                    user.Username,
                    user.Email,
                    user.UserRole
                });
            }
            catch (Exception ex)
            {
                // Log the exception (use a logger in a real-world app)
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }






        // User login (CustomerLogin)
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            var user = _dbContext.Users.SingleOrDefault(u => u.Email == loginDto.Email);
            if (user == null)
            {
                return Unauthorized(new { Message = "Invalid email or password" });
            }

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, loginDto.PasswordHash);
            if (result == PasswordVerificationResult.Failed)
            {
                return Unauthorized(new { Message = "Invalid email or password" });
            }

            // Generate a simple response or JWT token if needed
            return Ok(new
            {
                Message = "Login successful",
                UserDetails = new
                {
                    user.Id,
                    user.Username,
                    user.Email,
                    user.UserRole
                }
            });
        }
    }
}
*/



using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly LiaraDbContext _dbContext;

        public UsersController(LiaraDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // Get all users
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _dbContext.Users.Select(user => new
            {
                user.Id,
                user.Username,
                user.Email,
                user.UserRole
            }).ToList();
            return Ok(users);
        }

        // User registration (SignUp)
        [HttpPost("register-users")]
        public async Task<ActionResult<User>> PostUser(User userDetails)
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(userDetails.Username) ||
                string.IsNullOrWhiteSpace(userDetails.Email) ||
                string.IsNullOrWhiteSpace(userDetails.PasswordHash)) // Store the password as is
            {
                return BadRequest("All fields are required.");
            }

            // Assign default role if not provided
            if (string.IsNullOrEmpty(userDetails.UserRole))
            {
                userDetails.UserRole = "User"; // Default role
            }

            // Add the user to the database
            _dbContext.Users.Add(userDetails);
            await _dbContext.SaveChangesAsync();

            // Return the created user (without sensitive information)
            return CreatedAtAction(nameof(PostUser), new { id = userDetails.Id }, new
            {
                userDetails.Id,
                userDetails.Username,
                userDetails.Email,
                userDetails.UserRole
            });
        }

        // User login (CustomerLogin)
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            var user = _dbContext.Users.SingleOrDefault(u => u.Email == loginDto.Email);
            if (user == null)
            {
                return Unauthorized(new { Message = "Invalid email or password" });
            }

            // Simply check if the passwords match directly (no hashing or verification)
            if (user.PasswordHash != loginDto.PasswordHash)
            {
                return Unauthorized(new { Message = "Invalid email or password" });
            }

            // Generate a simple response or JWT token if needed
            return Ok(new
            {
                Message = "Login successful",
                UserDetails = new
                {
                    user.Id,
                    user.Username,
                    user.Email,
                    user.UserRole
                }
            });
        }
    }
}
