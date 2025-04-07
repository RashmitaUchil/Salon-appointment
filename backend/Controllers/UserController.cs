using System.Net;
using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using backend.Data;

using backend.IServices;
using backend.Models.Dtos;
using backend.Models.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [AutoValidateAntiforgeryToken]
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserServices userServices;

        public UserController(ApplicationDbContext dbContext, IUserServices userServices)
        {

            this.userServices = userServices ?? throw new ArgumentNullException(nameof(dbContext)); ;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (response, statusCode) = await userServices.Login(request);
            return StatusCode(statusCode, response);
        }

        [HttpPost("loginreact")]
        public async Task<IActionResult> LoginReact([FromBody] LoginRequest request)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (response, statusCode) = await userServices.LoginReact(request);
            return StatusCode(statusCode, response);


        }


        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (response, statusCode) = await userServices.Signup(request);
            return StatusCode(statusCode, response);


        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateUser(UpdateUser updateUser)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (response, statusCode) = await userServices.UpdateUser(updateUser);
            return StatusCode(statusCode, response);

        }




    }
}