using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using UseCase.Models.DTOS;
using UseCase.Repositories;


[ApiController]
[Route("api/[controller]")]
public class FeedbackController : ControllerBase
{
    private readonly IFeedbackService _service;

    public FeedbackController(IFeedbackService service)
    {
        _service = service;
    }


    //User submits feedback

    [Authorize(Roles = "User")]
    [HttpPost("submit-feedback")]
    public async Task<IActionResult> SubmitFeedback([FromBody] FeedbackDTO dto)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        return await _service.SubmitFeedbackAsync(dto, userId);
    }


    // Fetch Feedback by id

    [Authorize(Roles = "User")]
    [HttpGet("my-feedbacks")]
    public async Task<IActionResult> GetMyFeedbacks()
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        return await _service.GetMyFeedbacksAsync(userId);
    }


    //Display all feedbacks

    [Authorize(Roles = "Admin")]
    [HttpGet("all-feedbacks")]
    public async Task<IActionResult> GetAllFeedbacks()
    {
        return await _service.GetAllFeedbacksAsync();
    }


    //Approve feedback by id

    [Authorize(Roles = "Admin")]
    [HttpPatch("approve/{id}")]
    public async Task<IActionResult> ApproveFeedback(int id)
    {
        return await _service.ApproveFeedbackAsync(id);
    }


    //Approve all feedbacks

    [Authorize(Roles = "Admin")]
    [HttpPatch("approve-all")]
    public async Task<IActionResult> ApproveAllPending()
    {
        return await _service.ApproveAllPendingAsync();
    }


    //Get all users

    [Authorize(Roles = "Admin")]
    [HttpGet("GetAllUsers")]
    public async Task<IActionResult> GetAllUsers()
    {
        return await _service.GetAllUsersAsync();
    }


    //Get the approved feedbacks

    [Authorize(Roles = "Admin")]
    [HttpGet("approved-feedbacks")]
    public async Task<IActionResult> GetApprovedFeedbacks()
    {
        return await _service.GetApprovedFeedbacksAsync();
    }
}
