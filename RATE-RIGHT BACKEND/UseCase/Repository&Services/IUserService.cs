using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UseCase.Models;
using UseCase.Models.DTOS;

namespace UseCase.Repository_Services
{
    public interface IUserService
    {
        Task<IActionResult> RegisterAsync(UserDTO dto);
        Task<IActionResult> LoginAsync(UserDTO dto);
    }

    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public UserService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }


        //new user registration
        public async Task<IActionResult> RegisterAsync(UserDTO dto)
        {
            if (string.IsNullOrEmpty(dto.UserName) || string.IsNullOrEmpty(dto.Password))
                return new BadRequestObjectResult("Username and password are required.");

            var existingUser = await _userRepository.GetUserByUsernameAsync(dto.UserName);
            if (existingUser != null)
                return new BadRequestObjectResult("User already exists.");

            var user = new User
            {
                UserName = dto.UserName,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Name = dto.Name,
                Role = dto.Role
            };

            await _userRepository.AddUserAsync(user);
            return new OkObjectResult("User registered successfully.");
        }

        //user login
        public async Task<IActionResult> LoginAsync(UserDTO dto)
        {
            if (string.IsNullOrEmpty(dto.UserName) || string.IsNullOrEmpty(dto.Password))
                return new BadRequestObjectResult("Username and password are required.");

            var user = await _userRepository.GetUserByUsernameAsync(dto.UserName);
            if (user != null && BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                var token = GenerateJwtToken(user);
                return new OkObjectResult(new { token, user.Role, user.UserName });
            }

            return new UnauthorizedObjectResult("Invalid username or password.");
        }

        //generate jwt token
        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Role, user.Role)
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

}
