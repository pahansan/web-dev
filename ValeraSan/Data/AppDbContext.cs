using Microsoft.EntityFrameworkCore;
using ValeraSan.Models;

namespace ValeraSan.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Valera> Valeras { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Valera>()
                .HasOne(v => v.User)
                .WithMany(u => u.Valeras)
                .HasForeignKey(v => v.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
