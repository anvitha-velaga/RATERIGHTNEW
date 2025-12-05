using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace UseCase.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        //for new user registration
        public string? Name { get; set; } 
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Role { get; set; } //jwt

        //navigation property
        [JsonIgnore]
        public ICollection<Feedback> Feedbacks { get; set; }=new List<Feedback>();
        

    }
}
