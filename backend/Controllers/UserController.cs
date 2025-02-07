using System.Security.Cryptography;
using System.Text;
using AutoMapper;
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
        private readonly IMapper mapper;

        public UserController(ApplicationDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == request.Email);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }
            else if (!VerifyPassword(request.Password, user.Password))
            {
                return BadRequest(new { message = "incorrect password" });
            }

            return Ok(user);
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (await dbContext.Users.AnyAsync(x => x.Email == request.Email))
            {
                return BadRequest(new { message = "Email is already registered" });
            }

            var user = mapper.Map<User>(request);
            user.Password = HashPassword(request.Password);

            try
            {
                dbContext.Users.Add(user);
                await dbContext.SaveChangesAsync();
                return Ok(new { message = "Account created succesfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Could not create an account", error = ex.Message });
            }

        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateUser(UpdateUser updateUser)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Id == updateUser.Id);
            if (user == null)
            {
                return NotFound();
            }

            mapper.Map(updateUser, user);
            try
            {
                await dbContext.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Could not Save changes", error = ex.Message });
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