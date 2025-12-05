using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using UseCase.Models.DTOS;


namespace UseCase.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; } //for register
     
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Role { get; set; } //jwt
        [JsonIgnore]
        public ICollection<Feedback> Feedbacks { get; set; }=new List<Feedback>();
        

    }
}
