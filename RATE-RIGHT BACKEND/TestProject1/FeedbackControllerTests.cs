using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using UseCase.Controllers;
using UseCase.Data;
using UseCase.Models;
using UseCase.Repositories;

public class FeedbackControllerTests
{
    private FeedbackDbContext GetDbContext()
    {
        var options = new DbContextOptionsBuilder<FeedbackDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        return new FeedbackDbContext(options);
    }

    //Test get all users returns all users
    [Fact]
    public async Task GetAllUsers_Returns_ListOfUsers()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<FeedbackDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        var db = new FeedbackDbContext(options);

        db.Users.Add(new User { UserName = "Anvitha", Name = "Anvitha", Password = "12345678", Role = "admin" });
        db.Users.Add(new User { UserName = "Anvi", Name = "Anvi", Password = "45678911", Role = "user" });
        await db.SaveChangesAsync();

        var repo = new FeedbackRepository(db);
        var service = new FeedbackService(repo);
        var controller = new FeedbackController(service);

        // Act
        var result = await controller.GetAllUsers() as OkObjectResult;

        // Assert
        Assert.NotNull(result);
        var users = result.Value as List<User>;
        Assert.Equal(2, users.Count);
    }


    // Test to check the length of pending feedbacks
    [Fact]
    public async Task ApproveAllPending_ReturnsCorrectCount_WhenPendingFeedbacksExist()
    {
        var context = GetDbContext();
        context.Feedbacks.Add(new Feedback
        {
            Id = 1,
            MentorName = "SubbaReddy",
            Week = "Week1",
            LinesOfCode = "100",
            Rating = 5,
            Queries = "No",
            OpenQueries = "NA",
            Status = FeedbackStatus.Pending
        });
        context.Feedbacks.Add(new Feedback
        {
            Id = 2,
            MentorName = "Praveen",
            Week = "Week2",
            LinesOfCode = "200",
            Rating = 5,
            Queries = "No",
            OpenQueries = "NA",
            Status = FeedbackStatus.Pending
        });
        await context.SaveChangesAsync();

        var repo = new FeedbackRepository(context);
        var service = new FeedbackService(repo);
        var controller = new FeedbackController(service);
        var httpContext = new DefaultHttpContext();
        httpContext.User = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] { new Claim(ClaimTypes.Role, "Admin") }));
        controller.ControllerContext = new ControllerContext { HttpContext = httpContext };

        var result = await controller.ApproveAllPending() as OkObjectResult;

        Assert.NotNull(result);
        Assert.Equal("2 feedbacks approved.", result.Value);
    }

    //Test to check approved feedback displays 200 status code

    [Fact]
    public async Task ApproveFeedback_ReturnsOk_WhenFeedbackExists()
    {
        var context = GetDbContext();
        context.Feedbacks.Add(new Feedback
        {
            Id = 1,
            MentorName = "Subbareddy",
            Week = "Week1",
            LinesOfCode = "100",
            Rating = 5,
            Queries = "No",
            OpenQueries = "NA",
            Status = FeedbackStatus.Pending
        });
        await context.SaveChangesAsync();

        var repo = new FeedbackRepository(context);
        var service = new FeedbackService(repo);
        var controller = new FeedbackController(service);
        var httpContext = new DefaultHttpContext();
        httpContext.User = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] { new Claim(ClaimTypes.Role, "Admin") }));
        controller.ControllerContext = new ControllerContext { HttpContext = httpContext };

        var result = await controller.ApproveFeedback(1) as OkObjectResult;

        Assert.NotNull(result);
        Assert.Equal("Feedback approved.", result.Value);
    }

    //Test to check approved feedbacks return only the feedbacks that are approved
    [Fact]
    public async Task GetApprovedFeedbacks_ReturnsOnlyApprovedFeedbacks_WhenAdmin()
    {
        var context = GetDbContext();
        var user = new User
        {
            Id = 1,
            Name = "AdminUser",
            UserName = "adminuser",
            Password = "password12378888887",
            Role = "Admin"
        };
        context.Users.Add(user);
        context.Feedbacks.Add(new Feedback
        {
            Id = 1,
            MentorName = "SubbaReddy",
            Week = "Week1",
            LinesOfCode = "100",
            Rating = 5,
            Queries = "No",
            OpenQueries = "NA",
            Status = FeedbackStatus.Approved,
            User = user,
            UserId = 1
        });
        context.Feedbacks.Add(new Feedback
        {
            Id = 2,
            MentorName = "Subbareddy",
            Week = "Week2",
            LinesOfCode = "200",
            Rating = 5,
            Queries = "No",
            OpenQueries = "NA",
            Status = FeedbackStatus.Pending,
            User = user,
            UserId = 1
        });
        await context.SaveChangesAsync();

        var repo = new FeedbackRepository(context);
        var service = new FeedbackService(repo);
        var controller = new FeedbackController(service);
        var httpContext = new DefaultHttpContext();
        httpContext.User = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] { new Claim(ClaimTypes.Role, "Admin") }));
        controller.ControllerContext = new ControllerContext { HttpContext = httpContext };

        var result = await controller.GetApprovedFeedbacks() as OkObjectResult;
        var feedbackList = result?.Value as IEnumerable<object>;

        Assert.NotNull(feedbackList);
        Assert.Single(feedbackList);
        var feedback = feedbackList.First();
        Assert.Equal("AdminUser", feedback.GetType().GetProperty("UserName").GetValue(feedback));
    }


    //Display username along with all feedbacks
    [Fact]
    public async Task GetAllFeedbacks_ReturnsFeedbacksWithUserNames_WhenAdmin()
    {
        var context = GetDbContext();
        var user = new User
        {
            Id = 1,
            Name = "AdminUser",
            UserName = "adminuser",
            Password = "passsssword123",
            Role = "Admin"
        };
        context.Users.Add(user);
        context.Feedbacks.Add(new Feedback
        {
            Id = 1,
            MentorName = "Praveen",
            Week = "Week1",
            LinesOfCode = "100",
            Rating = 5,
            Queries = "No",
            OpenQueries = "NA",
            Status = FeedbackStatus.Pending,
            User = user,
            UserId = 1
        });
        await context.SaveChangesAsync();

        var repo = new FeedbackRepository(context);
        var service = new FeedbackService(repo);
        var controller = new FeedbackController(service);
        var httpContext = new DefaultHttpContext();
        httpContext.User = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] { new Claim(ClaimTypes.Role, "Admin") }));
        controller.ControllerContext = new ControllerContext { HttpContext = httpContext };

        var result = await controller.GetAllFeedbacks() as OkObjectResult;
        var feedbackList = result?.Value as IEnumerable<object>;

        Assert.NotNull(feedbackList);
        Assert.Single(feedbackList);
        var feedback = feedbackList.First();
        Assert.Equal("AdminUser", feedback.GetType().GetProperty("UserName").GetValue(feedback));
    }
}
