using Microsoft.EntityFrameworkCore;
using ValeraSan.Models;

namespace ValeraSan.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Valera> Valeras { get; set; }
    }
}