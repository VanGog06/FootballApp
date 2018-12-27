using FootballApp.Data.DbModels;
using Microsoft.EntityFrameworkCore;

namespace FootballApp.Data
{
    public class FootballAppContext : DbContext
    {
        public FootballAppContext(DbContextOptions<FootballAppContext> options)
            : base(options)
        {
        }

        public DbSet<Competition> Competitions { get; set; }
   
        public DbSet<Team> Teams { get; set; }

        public DbSet<Season> Seasons { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
        }
    }
}
