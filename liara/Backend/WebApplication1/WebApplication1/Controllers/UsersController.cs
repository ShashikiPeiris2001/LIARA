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
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net; // Add this namespace for password hashing

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly LiaraDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public UsersController(LiaraDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;

        }

        // Get all users
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _dbContext.Users.Select(user => new
            {
                user.UserID,
                user.Username,
                user.Email,
                user.Role
            }).ToList();
            return Ok(users);
        }

        [HttpPost("register-users")]
        public async Task<ActionResult<Users>> PostUser(Users userDetails)
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(userDetails.Username) ||
                string.IsNullOrWhiteSpace(userDetails.Email) ||
                string.IsNullOrWhiteSpace(userDetails.PasswordHash)) // Password is required
            {
                return BadRequest("All fields are required.");
            }

            // Check if the email is already registered
            var existingUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == userDetails.Email);
            if (existingUser != null)
            {
                return Conflict("Email is already registered.");
            }

            // Hash the password using BCrypt
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(userDetails.PasswordHash);

            // Replace the plain-text password with the hashed password
            userDetails.PasswordHash = hashedPassword;

            // Assign default role if not provided
            if (string.IsNullOrEmpty(userDetails.Role))
            {
                userDetails.Role = "User"; // Default role
            }

            // Add the user to the database
            _dbContext.Users.Add(userDetails);
            await _dbContext.SaveChangesAsync();

            // Return the created user (without sensitive information)
            return CreatedAtAction(nameof(PostUser), new { id = userDetails.UserID }, new
            {
                userDetails.UserID,
                userDetails.Username,
                userDetails.Email,
                userDetails.Role
            });
        }

        //// User login (CustomerLogin)
        //[HttpPost("login")]
        //public IActionResult Login([FromBody] LoginDto loginDto)
        //{
        //    var user = _dbContext.Users.SingleOrDefault(u => u.Email == loginDto.Email);
        //    if (user == null)
        //    {
        //        return Unauthorized(new { Message = "Invalid email or password" });
        //    }

        //    // Simply check if the passwords match directly (no hashing or verification)
        //    if (user.PasswordHash != loginDto.PasswordHash)
        //    {
        //        return Unauthorized(new { Message = "Invalid email or password" });
        //    }

        //    // Generate a simple response or JWT token if needed
        //    return Ok(new
        //    {
        //        Message = "Login successful",
        //        UserDetails = new
        //        {
        //            user.Id,
        //            user.Username,
        //            user.Email,
        //            user.UserRole
        //        }
        //    });



        //[HttpPost("login")]
        //public async Task<IActionResult> Login([FromBody] LoginDto login)
        //{
        //    if (string.IsNullOrWhiteSpace(login.Email) || string.IsNullOrWhiteSpace(login.PasswordHash))
        //    {
        //        return BadRequest(new { message = "Email and Password are required." });
        //    }

        // Check if user exists in the database and matches the password
        //var user = await _dbContext.Users
        //    .FirstOrDefaultAsync(u => u.Email == login.Email && u.PasswordHash == login.PasswordHash);

        //if (user == null)
        //{
        //    return Unauthorized(new { message = "Invalid email or password." });
        //}


        //return Ok(new
        //{
        //    message = "Login successful.",

        //    username = user.Username,
        //    role = user.UserRole
        //});
        //    var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == login.Email);

        //    if (user == null)
        //    {
        //        // User not found
        //        return Unauthorized(new { message = "Invalid email or password." });
        //    }

        //    // Verify the password hash
        //    if (!BCrypt.Net.BCrypt.Verify(login.PasswordHash, user.PasswordHash))
        //    {
        //        // Password doesn't match
        //        return Unauthorized(new { message = "Invalid email or password." });
        //    }

        //    // Successful login
        //    return Ok(new
        //    {
        //        message = "Login successful.",
        //        username = user.Username,
        //        role = user.UserRole
        //    });

        //}


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginRequest)
        {
            //Console.WriteLine($"Received Login Request: Email = {loginRequest.Email}, Password = {loginRequest.Password}");

            if (string.IsNullOrWhiteSpace(loginRequest.Email) || string.IsNullOrWhiteSpace(loginRequest.Password))
            {
                return BadRequest(new { message = "Email and password are required." });
            }

            // Retrieve user from the database
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);

            if (user == null)
            {
                Console.WriteLine("User not found: " + loginRequest.Email);
                return Unauthorized(new { message = "Invalid email or password." });
            }

            if (!BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.PasswordHash))
            {
                Console.WriteLine("Password mismatch for: " + loginRequest.Email);
                return Unauthorized(new { message = "Invalid email or password." });
            }


            // Generate JWT Token
            string token = GenerateJwtToken(user);

            return Ok(new
            {
                user.UserID,
                user.Username,
                user.Email,
                user.Role,
                Token = token
            });
        }

        private string GenerateJwtToken(Users user)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user), "User object is null.");

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserID.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email ?? ""),
                new Claim(ClaimTypes.Role, user.Role ?? "User")
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }



        // ✅ Reset Password (Without Hashing)
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPassword model)
        {
            if (string.IsNullOrWhiteSpace(model.Email) || string.IsNullOrWhiteSpace(model.NewPassword))
            {
                return BadRequest(new { message = "Email and new password are required." });
            }

            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            // Directly updating password (⚠️ Not recommended for security reasons)

            string hashedPassword1 = BCrypt.Net.BCrypt.HashPassword(model.NewPassword);

            user.PasswordHash = hashedPassword1;

            _dbContext.Users.Update(user);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = "Password updated successfully!" });
        }


        /*//[HttpPost("reset-password")]
        //public async Task<IActionResult> ResetPassword([FromBody] ResetPassword model)
        //{
        //    var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == model.Email);

        //    if (user == null)
        //    {
        //        Console.WriteLine("Login failed: User not found");
        //        return Unauthorized(new { message = "Invalid email or password." });
        //    }

        //    if (!BCrypt.Net.BCrypt.Verify(model.NewPassword, user.PasswordHash))
        //    {
        //        Console.WriteLine("Login failed: Password does not match");
        //        return Unauthorized(new { message = "Invalid email or password." });
        //    }

        //    Console.WriteLine("Login successful for user: " + user.Email);


        //    user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.NewPassword);
        //    _dbContext.Users.Update(user); 
        //    await _dbContext.SaveChangesAsync();

        //    return Ok(new { message = "Password reset successful." });
        //}*/

    }






}
