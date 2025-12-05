using System.ComponentModel.DataAnnotations;

namespace UseCase.Models.DTOS
{
    public class UserDTO
    {
        public string? Name { get; set; } //for new user
        public string Password { get; set; }
       public string UserName {  get; set; }
        public string? Role { get; set; }

    }
}
