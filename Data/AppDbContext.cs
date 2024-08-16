using Microsoft.EntityFrameworkCore;
using WayniPrueba.Data.Models;

namespace WayniPrueba.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
        {
            
        }

        public DbSet<User> Users { get; set; }
    }
}
