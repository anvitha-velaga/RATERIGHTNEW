using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Moq;
using UseCase.Controllers;
using UseCase.Models;
using UseCase.Models.DTOS;
using UseCase.Repository_Services;
using Xunit;

public class UserLoginControllerTests
{
    private IConfiguration GetConfiguration()
    {
        var settings = new Dictionary<string, string>
        {
            ["Jwt:Key"] = "ThisIsASecureTestKeyForHmacSha256888",
            ["Jwt:Issuer"] = "TestIssuer",
            ["Jwt:Audience"] = "TestAudience"
        };
        return new ConfigurationBuilder().AddInMemoryCollection(settings).Build();
    }

    // Test for user registration
    [Fact]
    public async Task Register_CreatesUser_WhenValid()
    {
        var mockService = new Mock<IUserService>();
        mockService.Setup(service => service.RegisterAsync(It.IsAny<UserDTO>()))
                  .ReturnsAsync(new OkObjectResult("User registered successfully."));

        var config = GetConfiguration();
        var controller = new UserLoginController(mockService.Object);

        var dto = new UserDTO { UserName = "newuser", Password = "P@ssw0rd!", Name = "New User", Role = "User" };
        var result = await controller.Register(dto) as OkObjectResult;

        Assert.NotNull(result);
        Assert.Equal("User registered successfully.", result.Value);
    }

    // Test for user login with invalid credentials

    [Fact]
    public async Task Login_ReturnsUnauthorized_WhenCredentialsInvalid()
    {
        var mockService = new Mock<IUserService>();
        mockService.Setup(service => service.LoginAsync(It.IsAny<UserDTO>()))
                  .ReturnsAsync(new UnauthorizedObjectResult("Invalid username or password."));

        var config = GetConfiguration();
        var controller = new UserLoginController(mockService.Object);

        var result = await controller.Login(new UserDTO { UserName = "jdoe", Password = "wrongpwd" }) as UnauthorizedObjectResult;
        Assert.NotNull(result);
        Assert.Equal("Invalid username or password.", result.Value);
    }

    // Test for user login with valid credentials

    [Fact]
    public async Task Login_ReturnsTokenAndRole_WhenCredentialsValid()
    {
        var mockService = new Mock<IUserService>();
        var config = GetConfiguration();
        var controller = new UserLoginController(mockService.Object);

        
        mockService.Setup(service => service.LoginAsync(It.IsAny<UserDTO>()))
                  .ReturnsAsync(new OkObjectResult(new { token = "fake-jwt-token", Role = "Admin", UserName = "alice" }));

        var result = await controller.Login(new UserDTO { UserName = "alice", Password = "secret" }) as OkObjectResult;
        Assert.NotNull(result);

        dynamic payload = result.Value;
        Assert.Equal("fake-jwt-token", payload.token);
        Assert.Equal("Admin", payload.Role);
        Assert.Equal("alice", payload.UserName);
    }
}
