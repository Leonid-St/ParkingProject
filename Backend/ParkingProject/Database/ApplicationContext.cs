using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace ParkingProject.Database
{
    public class ApplicationContext : IdentityDbContext<User, Role, Guid>
    {
        public ApplicationContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public DbSet<Car> Cars { get; set; }

        public DbSet<Parking> Parkings { get; set; }

        public DbSet<DateEntryAndExit> DateEntryAndExits { get; set; }

        public DbSet<ParkingState> ParkingStates { get; set; }

        public DbSet<Brand> Brands { get; set; }

        public DbSet<Model> Models { get; set; }

        public DbSet<Operator> Operators { get; set; }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            /*modelBuilder.Entity<Room>().ToTable(nameof(Rooms)).Property(r => r.Name).HasMaxLength(250);
            modelBuilder.Entity<Video>().ToTable(nameof(Videos)).Property(r => r.Name).HasMaxLength(250);
            modelBuilder.Entity<Messages>().ToTable(nameof(Messages)).Property(r => r.User).HasMaxLength(250);*/
            modelBuilder.Entity<Car>().ToTable(nameof(Cars)).HasKey(u => u.Id);
            //connectionId  не ограничивается по длине 
            //modelBuilder.Entity<RoomConnection>().ToTable(nameof(RoomConnections)).Property(r => r.ConnectionId).HasMaxLength(250);
            modelBuilder.Entity<Parking>().ToTable(nameof(Parkings)).HasKey(p => p.Id);
            modelBuilder.Entity<DateEntryAndExit>().ToTable(nameof(DateEntryAndExits)).HasKey(p => p.Id);
            modelBuilder.Entity<ParkingState>().ToTable(nameof(ParkingStates)).HasKey(p => p.Id);
            modelBuilder.Entity<Brand>().ToTable(nameof(Brands)).HasKey(p => p.Id);
            modelBuilder.Entity<Model>().ToTable(nameof(Models)).HasKey(p => p.Id);
            modelBuilder.Entity<Operator>().ToTable(nameof(Operators)).HasKey(p => p.Id);
            modelBuilder.Entity<Operator>().HasData(new Operator
            {
                Id = Guid.NewGuid(),
                Name = "Leonid",
                Password = "1234",
            });
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                string con = Configuration.GetConnectionString("DefaultConnection");

                optionsBuilder.UseSqlServer(con);
            }
        }
    }
}