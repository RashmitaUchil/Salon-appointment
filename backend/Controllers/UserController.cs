using System.Security.Cryptography;
using System.Text;
using backend.Data;
using backend.Models.Dtos;
using backend.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public UserController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var user = dbContext.Users.FirstOrDefault(x => x.Email == request.Email);
            if (user == null || !VerifyPassword(request.Password, user.Password))
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            return Ok(user);
        }

        [HttpPost("signup")]
        public IActionResult AddUser([FromBody] AddUser newuser)
        {
            if (dbContext.Users.Any(x => x.Email == newuser.Email))
            {
                return BadRequest(new { message = "Email is already registered" });
            }

            var user = new User()
            {
                Name = newuser.Name,
                Email = newuser.Email,
                Password = HashPassword(newuser.Password),
                Phone = newuser.Phone
            };

            dbContext.Users.Add(user);
            dbContext.SaveChanges();

            return Ok(new { message = "User created successfully" });
        }

        [HttpPut]
        public IActionResult UpdateUser(UpdateUser updateUser)
        {
            var user = dbContext.Users.FirstOrDefault(u => u.Id == updateUser.Id);
            if (user == null)
            {
                return NotFound();
            }
            user.Name = updateUser.Name;
            user.Email = updateUser.Email;
            user.Phone = updateUser.Phone;

            try
            {
                dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception("Could not save update:", ex);
            }
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(bytes);
            }
        }

        private bool VerifyPassword(string enteredPassword, string storedHash)
        {
            return HashPassword(enteredPassword) == storedHash;
        }
    }
}