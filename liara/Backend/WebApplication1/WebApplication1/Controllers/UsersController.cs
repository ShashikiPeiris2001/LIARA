using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly LiaraDbContext dbContext;

        //private readonly IConfiguration _configuration;

        //public UsersController(IConfiguration configuration)

        //{
        //   _configuration = configuration;
        //}
        //[HttpPost]
        //[Route("registration")]

        //public Response register(Users users)
        //{
        //    Response response = new Response();
        //    SqlConnection
        //    return response;

        //}
        public UsersController(LiaraDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var allUsers = dbContext.Users.ToList();
            return Ok(allUsers);

        }
        [HttpPost]
        public IActionResult AddUsers(AddUsersDto addUsersDto)
        {
            var userEntity = new User()
            {
                Username = addUsersDto.Username,
                Email = addUsersDto.Email,
                PasswordHash = addUsersDto.PasswordHash,
                UserRole =addUsersDto.UserRole
            };

            dbContext.Users.Add(userEntity);
            dbContext.SaveChanges();
            return Ok(userEntity);
        }

    }
}
