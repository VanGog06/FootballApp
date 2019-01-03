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

        public DbSet<User> Users { get; set; }

        public DbSet<Competition> Competitions { get; set; }
   
        public DbSet<Team> Teams { get; set; }

        public DbSet<Season> Seasons { get; set; }

        public DbSet<Standing> Standings { get; set; }

        public DbSet<Player> Players { get; set; }

        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Player>()
                .Property(p => p.NumberOfGoals)
                .HasDefaultValue(0);

            builder.Entity<UserRole>().HasKey(ur => new { ur.UserId, ur.RoleId });
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
        }
    }
}
