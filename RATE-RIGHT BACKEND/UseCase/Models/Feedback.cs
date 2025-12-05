using System.Text.Json.Serialization;
using UseCase.Models;

public enum FeedbackStatus
{
    Pending,
    Approved
}

public class Feedback
{
    public int Id { get; set; }
    public string MentorName { get; set; }
    public string Week { get; set; }
    public string Queries { get; set; }
    public string OpenQueries { get; set; }
    public string LinesOfCode { get; set; }
    public int Rating { get; set; }

    // default pending
    public FeedbackStatus Status { get; set; } = FeedbackStatus.Pending; 

    public DateTime SubmittedOn { get; set; } = DateTime.UtcNow;

    // navigation property
    [JsonIgnore]
    public User? User { get; set; }

    // foreign key
    public int UserId { get; set; }  
}
