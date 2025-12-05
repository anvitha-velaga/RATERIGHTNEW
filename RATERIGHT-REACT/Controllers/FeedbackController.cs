using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using UseCase.Data;
using UseCase.Models;
using UseCase.Models.DTOS;

namespace UseCase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FeedbackController(ApplicationDbContext context)
        {
            _context = context;
        }

        // USER 

        // User submits feedback
        [Authorize(Roles = "User")]
        [HttpPost("submit-feedback")]
        public async Task<IActionResult> SubmitFeedback([FromBody] FeedbackDTO dto)
        {

            if (dto.Rating < 1 || dto.Rating > 5)
                return BadRequest("Rating must be between 1 and 5.");

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value); 

            var feedback = new Feedback
            {
                MentorName = dto.MentorName,
                Week = dto.Week,
                Queries = dto.Queries,
                OpenQueries = dto.OpenQueries,
                LinesOfCode = dto.LinesOfCode,
                Rating = dto.Rating,
                Status = FeedbackStatus.Pending,   // default
                UserId = userId,
                SubmittedOn = DateTime.UtcNow
            };

            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Feedback submitted successfully,Waiting for admin approval." });
        }

        // User views their own feedbacks
        [Authorize(Roles = "User")]
        [HttpGet("my-feedbacks")]
        public async Task<IActionResult> GetMyFeedbacks()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var feedbacks = await _context.Feedbacks
                .Where(f => f.UserId == userId)
                .OrderByDescending(f => f.Id)
                 .Select(f => new
                 {
                     f.Id,
                     f.MentorName,
                     f.Week,
                     f.LinesOfCode,
                     f.Rating,
                     Status = f.Status.ToString(),
                     f.SubmittedOn  
                 })
                    .ToListAsync();

            return Ok(feedbacks);
        }

        
        // ADMIN 
        // Admin views all feedbacks with user names
        [Authorize(Roles = "Admin")]
        [HttpGet("all-feedbacks")]
        public async Task<IActionResult> GetAllFeedbacks()
        {
            var feedbacks = await _context.Feedbacks
                .Include(f => f.User) // include user
                .OrderByDescending(f => f.Id)
                .Select(f => new
                {
                    f.Id,
                    UserName = f.User.Name,
                    f.MentorName,
                    f.Week,
                    f.LinesOfCode,
                    f.Rating,
                    Status = f.Status.ToString(),
                    f.SubmittedOn
                })
                .ToListAsync();

            return Ok(feedbacks);
        }

        // Admin approves a single feedback
        [Authorize(Roles = "Admin")]
        [HttpPatch("approve/{id}")]
        public async Task<IActionResult> ApproveFeedback(int id)
        {
            var feedback = await _context.Feedbacks.FindAsync(id);
            if (feedback == null) return NotFound("Feedback not found.");

            feedback.Status = FeedbackStatus.Approved;
            await _context.SaveChangesAsync();

            return Ok("Feedback approved.");
        }

        // Admin approves all pending feedbacks
        [Authorize(Roles = "Admin")]
        [HttpPatch("approve-all")]
        public async Task<IActionResult> ApproveAllPending()
        {
            var pending = await _context.Feedbacks
                .Where(f => f.Status == FeedbackStatus.Pending)
                .ToListAsync();

            foreach (var fb in pending)
                fb.Status = FeedbackStatus.Approved;

            await _context.SaveChangesAsync();

            return Ok($"{pending.Count} feedback(s) approved.");
        }
        // DELETE
        // Only the user who submitted the feedback can delete it
        [Authorize(Roles = "User")]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteFeedback(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var feedback = await _context.Feedbacks.FindAsync(id);
            if (feedback == null)
                return NotFound("Feedback not found.");

            if (feedback.UserId != userId)
                return Forbid("You are not allowed to delete this feedback.");

            _context.Feedbacks.Remove(feedback);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Feedback deleted successfully." });
        }
        //GET ALL USERS
        [Authorize(Roles = "Admin")]
            [HttpGet("GetAllUsers")]
            public async Task<IActionResult> GetAllUsers()
            {
                var users = await _context.Users.ToListAsync();
                return Ok(users);
            }

        // Admin: get only approved feedbacks
        [Authorize(Roles = "Admin")]
        [HttpGet("approved-feedbacks")]
        public async Task<IActionResult> GetApprovedFeedbacks()
        {
            var approvedFeedbacks = await _context.Feedbacks
                .Include(f => f.User)
                .Where(f => f.Status == FeedbackStatus.Approved)
                .OrderByDescending(f => f.Id)
                .Select(f => new
                {
                    f.Id,
                    UserName = f.User.Name,
                    f.MentorName,
                    f.Week,
                    f.LinesOfCode,
                    f.Rating,
                    Status = f.Status.ToString(),
                    f.SubmittedOn
                })
                .ToListAsync();

            return Ok(approvedFeedbacks);
        }

    }

}

