namespace UseCase.Models.DTOS
{
    public class FeedbackDTO
    {
        public string MentorName { get; set; }
        public string Week { get; set; }
        public string Queries { get; set; }
        public string OpenQueries { get; set; }
        public string LinesOfCode { get; set; }
        public int Rating { get; set; }
        public DateTime SubmittedOn { get; set; } = DateTime.UtcNow;
        // important!
    }
}

