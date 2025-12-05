using System.ComponentModel.DataAnnotations;

namespace UseCase.Models.DTOS
{
    public class UserDTO
    {
        //for new user
        public string? Name { get; set; }
        public string Password { get; set; }
       public string UserName {  get; set; }
        public string? Role { get; set; }

    }
}
