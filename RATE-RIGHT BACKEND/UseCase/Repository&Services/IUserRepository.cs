using Microsoft.EntityFrameworkCore;
using UseCase.Data;
using UseCase.Models;

namespace UseCase.Repository_Services
{
    public interface IUserRepository
    {
        Task<User> GetUserByUsernameAsync(string username);
        Task AddUserAsync(User user);
    }

    public class UserRepository : IUserRepository
    {
        private readonly FeedbackDbContext _context;

        public UserRepository(FeedbackDbContext context)
        {
            _context = context;
        }

        //get user by username
        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserName == username);
        }

        //add new user
        public async Task AddUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }
    }

}
