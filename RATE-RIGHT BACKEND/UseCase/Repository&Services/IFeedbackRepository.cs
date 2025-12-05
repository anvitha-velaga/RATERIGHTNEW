using Microsoft.EntityFrameworkCore;
using UseCase.Data;
using UseCase.Models;

namespace UseCase.Repositories
{
    public interface IFeedbackRepository
    {
        Task<Feedback> SubmitFeedbackAsync(Feedback feedback);
        Task<List<Feedback>> GetFeedbacksByUserIdAsync(int userId);
        Task<List<Feedback>> GetAllFeedbacksAsync();
        Task<Feedback> GetFeedbackByIdAsync(int id);
        Task<List<Feedback>> GetPendingFeedbacksAsync();
        Task<List<Feedback>> GetApprovedFeedbacksAsync();
        Task<List<User>> GetAllUsersAsync();
        Task SaveChangesAsync();
    }

    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly FeedbackDbContext _context;

        public FeedbackRepository(FeedbackDbContext context)
        {
            _context = context;
        }

        //submit feedback
        public async Task<Feedback> SubmitFeedbackAsync(Feedback feedback)
        {
            _context.Feedbacks.Add(feedback);
            await SaveChangesAsync();
            return feedback;
        }
        //get feedback by id
        public async Task<List<Feedback>> GetFeedbacksByUserIdAsync(int userId)
        {
            return await _context.Feedbacks
                .Where(f => f.UserId == userId)
                .OrderByDescending(f => f.Id)
                .ToListAsync();
        }
        //get all feedbacks
        public async Task<List<Feedback>> GetAllFeedbacksAsync()
        {
            return await _context.Feedbacks
                .Include(f => f.User)
                .OrderByDescending(f => f.Id)
                .ToListAsync();
        }
        public async Task<Feedback> GetFeedbackByIdAsync(int id)
        {
            return await _context.Feedbacks.FindAsync(id);
        }
        //get pending feedbacks
        public async Task<List<Feedback>> GetPendingFeedbacksAsync()
        {
            return await _context.Feedbacks
                .Where(f => f.Status == FeedbackStatus.Pending)
                .ToListAsync();
        }
        //get approved feedbacks only
        public async Task<List<Feedback>> GetApprovedFeedbacksAsync()
        {
            return await _context.Feedbacks
                .Include(f => f.User)
                .Where(f => f.Status == FeedbackStatus.Approved)
                .ToListAsync();
        }
        //return all users
        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }
        //save the changes
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }

}
