using backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Appointment> Appointments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.User)  // Appointment belongs to User
                .WithMany(u => u.Appointments) // User has multiple Appointments
                .HasForeignKey(a => a.UserId)  // Foreign key
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}