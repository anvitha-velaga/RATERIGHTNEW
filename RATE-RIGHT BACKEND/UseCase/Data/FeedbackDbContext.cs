using Microsoft.EntityFrameworkCore;
using UseCase.Models;

namespace UseCase.Data
{
    public class FeedbackDbContext : DbContext
    {
        public FeedbackDbContext(DbContextOptions<FeedbackDbContext> options)
        
                : base(options) { }


        //db set creates tables in database
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<User> Users { get; set; }

        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Feedback>()
                .Property(f => f.Status)
                .HasConversion<string>();

            //Set default feedback status to pending
            modelBuilder.Entity<Feedback>()
                .Property(f => f.Status) 
                .HasDefaultValue(FeedbackStatus.Pending);
        }
    }
}
