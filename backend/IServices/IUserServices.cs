using Microsoft.AspNetCore.Mvc;
using backend.Models.Dtos;
using backend.Models.Entities;


namespace backend.IServices
{
    public interface IUserServices
    {
        Task<(object response, int statusCode)> Login(LoginRequest request);
        Task<(object response, int statusCode)> LoginReact(LoginRequest request);
        Task<(object response, int statusCode)> Signup(SignupRequest request);
        Task<(object response, int statusCode)> UpdateUser(UpdateUser updateUser);
    }


}