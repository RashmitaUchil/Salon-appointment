using System.Net;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using backend.Data;
using backend.Data.IRepository;
using backend.IServices;
using backend.Models.Dtos;
using backend.Models.Entities;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;


public class UserServices : IUserServices
{
    private readonly ApplicationDbContext dbContext;
    private readonly IMapper mapper;

    private readonly IUserRepository userRepository;

    public UserServices(ApplicationDbContext dbContext, IMapper mapper, IUserRepository userRepository)
    {
        this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        this.userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));

    }

    public async Task<(object response, int statusCode)> Login(LoginRequest request)
    {
        try
        {
            if (request == null) return (new { message = "Invalid request" }, (int)HttpStatusCode.BadRequest);

            var user = await userRepository.FindUserByEmail(request.Email);
            if (user == null)
                return (new { message = "User not found" }, (int)HttpStatusCode.NotFound);
            if (!VerifyPassword(request.Password, user.Password))
                return (new { message = "Incorrect password" }, (int)HttpStatusCode.BadRequest);
            return (new { message = "Login successful", user }, (int)HttpStatusCode.OK);
        }
        catch (Exception ex)
        {
            return (new { message = "Could not login" }, GetStatusCodeFromException(ex));
        }
    }

    public async Task<(object response, int statusCode)> LoginReact(LoginRequest request)
    {
        try
        {
            if (request == null) return (new { message = "Invalid request" }, (int)HttpStatusCode.BadRequest);
            var user = await userRepository.FindUserByEmail(request.Email);
            if (user == null)
                return (new { message = "User not found" }, (int)HttpStatusCode.NotFound);
            if (!VerifyPassword(request.Password, user.Password))
                return (new { message = "Incorrect password" }, (int)HttpStatusCode.BadRequest);
            return (user, (int)HttpStatusCode.OK);
        }
        catch (Exception ex)
        {
            return (new { message = "Could not login" }, GetStatusCodeFromException(ex));
        }
    }

    public async Task<(object response, int statusCode)> Signup(SignupRequest request)
    {
        if (request == null) return (new { message = "Invalid request" }, (int)HttpStatusCode.BadRequest);

        if (await userRepository.FindUserByEmail(request.Email) != null)
            return (new { message = "Email is already registered" }, (int)HttpStatusCode.BadRequest);
        var user = mapper.Map<User>(request);
        user.Password = HashPassword(request.Password);
        try
        {
            await userRepository.AddUser(user);
            return (new { message = "Account created successfully" }, (int)HttpStatusCode.OK);
        }
        catch (Exception ex)
        {
            return (new { message = "Could not create an account" }, GetStatusCodeFromException(ex));
        }
    }

    public async Task<(object response, int statusCode)> UpdateUser(UpdateUser updateUser)
    {
        if (updateUser == null) return (new { message = "Invalid request" }, (int)HttpStatusCode.BadRequest);
        var user = await userRepository.FindUserById(updateUser.Id);
        if (user == null)
            return (new { message = "User not found" }, (int)HttpStatusCode.NotFound);
        mapper.Map(updateUser, user);
        try
        {
            await userRepository.SaveUser();
            return (new { message = "Changes saved" }, (int)HttpStatusCode.OK);
        }
        catch (Exception ex)
        {
            return (new { message = "Could not save changes" }, GetStatusCodeFromException(ex));
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

    private int GetStatusCodeFromException(Exception ex)
    {
        return ex switch
        {
            SqlException _ => (int)HttpStatusCode.InternalServerError,
            ArgumentNullException _ => (int)HttpStatusCode.BadRequest,
            UnauthorizedAccessException _ => (int)HttpStatusCode.Unauthorized,
            InvalidOperationException _ => (int)HttpStatusCode.BadRequest,
            FileNotFoundException _ => (int)HttpStatusCode.NotFound,
            _ => (int)HttpStatusCode.InternalServerError,
        };
    }
}
