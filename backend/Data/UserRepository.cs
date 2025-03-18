using Microsoft.EntityFrameworkCore;
using backend.Models.Entities;
using backend.Data;
using System.Net;
using backend.Data.IRepository;
namespace backend.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext dbContext;

        public UserRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public async Task<User?> FindUserById(int Id)
        {
            return await dbContext.Users.FirstOrDefaultAsync(u => u.Id == Id);

        }

        public async Task<User?> FindUserByEmail(string Email)
        {
            return await dbContext.Users.FirstOrDefaultAsync(u => u.Email == Email);

        }

        public async Task AddUser(User user)
        {
            dbContext.Users.Add(user);
            await dbContext.SaveChangesAsync();
        }

        public async Task SaveUser()
        {
            await dbContext.SaveChangesAsync();
        }

    }
}