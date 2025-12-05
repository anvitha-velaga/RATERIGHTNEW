using Microsoft.EntityFrameworkCore;
using UseCase.Models;
using UseCase.Models.DTOS;

namespace UseCase.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Feedback>()
                .Property(f => f.Status)
                .HasConversion<string>();

            // Optional: set default value explicitly
            modelBuilder.Entity<Feedback>()
                .Property(f => f.Status)
                .HasDefaultValue(FeedbackStatus.Pending);
        }
    }
}
