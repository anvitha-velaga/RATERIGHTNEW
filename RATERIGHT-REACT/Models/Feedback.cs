using System.Text.Json.Serialization;
using UseCase.Models;
using UseCase.Models.DTOS;

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
    public int Rating { get; set; }  // 1-5
    public FeedbackStatus Status { get; set; } = FeedbackStatus.Pending; // default pending

    public DateTime SubmittedOn { get; set; } = DateTime.UtcNow;

    [JsonIgnore]
    public User? User { get; set; }  // navigation property
    public int UserId { get; set; }  // foreign key
}
