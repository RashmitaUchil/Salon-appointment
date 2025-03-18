using backend.Models.Entities;

namespace backend.Data.IRepository
{
    public interface IUserRepository
    {
        Task<User?> FindUserById(int Id);
        Task<User?> FindUserByEmail(string Email);
        Task AddUser(User user);
        Task SaveUser();


    }
}