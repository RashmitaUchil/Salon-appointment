using System.Security.Cryptography;
using System.Text;
using backend.Data;
using backend.Models.Dtos;
using backend.Models.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public UserController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext)); ;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == request.Email);
            if (user == null)
            {
                return Unauthorized(new { message = "User not found" });
            }
            else if(!VerifyPassword(request.Password, user.Password))
            {
                return BadRequest(new { message = "incorrect password" });
            }

            return Ok(user);
        }

        [HttpPost("signup")]
        public async Task<IActionResult> AddUser([FromBody] AddUser newuser)
        {
            if (await dbContext.Users.AnyAsync(x => x.Email == newuser.Email))
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
            await dbContext.SaveChangesAsync();

            return Ok(new { message = "User created successfully" });
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser(UpdateUser updateUser)
        {
            var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Id == updateUser.Id);
            if (user == null)
            {
                return NotFound();
            }
            user.Name = updateUser.Name;
            user.Email = updateUser.Email;
            user.Phone = updateUser.Phone;

            try
            {
                await dbContext.SaveChangesAsync();
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