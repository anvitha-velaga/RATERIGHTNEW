using Microsoft.AspNetCore.Mvc;
using UseCase.Models.DTOS;

namespace UseCase.Repositories
{
    public interface IFeedbackService
    {
         Task<IActionResult> SubmitFeedbackAsync(FeedbackDTO dto, int userId);
         Task<IActionResult> GetMyFeedbacksAsync(int userId);
        Task<IActionResult> GetAllFeedbacksAsync();
        Task<IActionResult> ApproveFeedbackAsync(int id);
        Task<IActionResult> ApproveAllPendingAsync();
         Task<IActionResult> GetAllUsersAsync();
        Task<IActionResult> GetApprovedFeedbacksAsync();
    }

    public class FeedbackService : IFeedbackService
    {
        private readonly IFeedbackRepository _repository;

        public FeedbackService(IFeedbackRepository repository)
        {
            _repository = repository;
        }
        //submit feedback
        public async Task<IActionResult> SubmitFeedbackAsync(FeedbackDTO dto, int userId)
        {
            if (dto.Rating < 1 || dto.Rating > 5)
                return new BadRequestObjectResult("Rating must be between 1 & 5");

            var feedback = new Feedback
            {
                MentorName = dto.MentorName,
                Week = dto.Week,
                Queries = dto.Queries,
                OpenQueries = dto.OpenQueries,
                LinesOfCode = dto.LinesOfCode,
                Rating = dto.Rating,
                Status = FeedbackStatus.Pending,
                UserId = userId,
                SubmittedOn = DateTime.UtcNow
            };

            await _repository.SubmitFeedbackAsync(feedback);
            return new OkObjectResult(new { Message = "Feedback submitted successfully,Waiting for admin approval." });
        }
        //get feedback
        public async Task<IActionResult> GetMyFeedbacksAsync(int userId)
        {
            var feedbacks = await _repository.GetFeedbacksByUserIdAsync(userId);
            var result = feedbacks.Select(f => new
            {
                f.Id,
                f.MentorName,
                f.Week,
                f.LinesOfCode,
                f.Rating,
                Status = f.Status.ToString(),
                f.SubmittedOn
            }).ToList();
            return new OkObjectResult(result);
        }
        //get all feedbacks with username
        public async Task<IActionResult> GetAllFeedbacksAsync()
        {
            var feedbacks = await _repository.GetAllFeedbacksAsync();
            var result = feedbacks.Select(f => new
            {
                f.Id,
                UserName = f.User.Name,
                f.MentorName,
                f.Week,
                f.LinesOfCode,
                f.Rating,
                Status = f.Status.ToString(),
                f.SubmittedOn
            }).ToList();
            return new OkObjectResult(result);
        }
        //approve feedbacks by id
        public async Task<IActionResult> ApproveFeedbackAsync(int id)
        {
            var feedback = await _repository.GetFeedbackByIdAsync(id);
            if (feedback == null)
                return new NotFoundObjectResult("Feedback not found.");

            feedback.Status = FeedbackStatus.Approved;
            await _repository.SaveChangesAsync();
            return new OkObjectResult("Feedback approved.");
        }
        //approve all the pending feedbacks
        public async Task<IActionResult> ApproveAllPendingAsync()
        {
            var pending = await _repository.GetPendingFeedbacksAsync();
            foreach (var fb in pending)
                fb.Status = FeedbackStatus.Approved;

            await _repository.SaveChangesAsync();
            return new OkObjectResult($"{pending.Count} feedbacks approved.");
        }
        //fetch all users with usernames
        public async Task<IActionResult> GetAllUsersAsync()
        {
            var users = await _repository.GetAllUsersAsync();
            return new OkObjectResult(users);
        }
        //get only approved feedbacks
        public async Task<IActionResult> GetApprovedFeedbacksAsync()
        {
            var feedbacks = await _repository.GetApprovedFeedbacksAsync();
            var result = feedbacks.Select(f => new
            {
                f.Id,
                UserName = f.User.Name,
                f.MentorName,
                f.Week,
                f.LinesOfCode,
                f.Rating,
                Status = f.Status.ToString(),
                f.SubmittedOn
            }).ToList();
            return new OkObjectResult(result);
        }
    }

}
