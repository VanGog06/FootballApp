﻿// <auto-generated />
using System;
using FootballApp.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace FootballApp.Data.Migrations
{
    [DbContext(typeof(FootballAppContext))]
    [Migration("20181228141250_addedPlayersTable")]
    partial class addedPlayersTable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.0-rtm-35687")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("FootballApp.Data.DbModels.Competition", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Country");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Competitions");
                });

            modelBuilder.Entity("FootballApp.Data.DbModels.Player", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CountryOfBirth");

                    b.Property<DateTime>("DateOfBirth");

                    b.Property<string>("Name");

                    b.Property<string>("Nationality");

                    b.Property<int>("NumberOfGoals")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(0);

                    b.Property<string>("Position");

                    b.Property<string>("Role");

                    b.Property<int?>("ShirtNumber");

                    b.Property<int>("TeamId");

                    b.HasKey("Id");

                    b.HasIndex("TeamId");

                    b.ToTable("Players");
                });

            modelBuilder.Entity("FootballApp.Data.DbModels.Season", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CompetitionId");

                    b.Property<int?>("CurrentMatchday");

                    b.Property<DateTime>("EndDate");

                    b.Property<DateTime>("StartDate");

                    b.Property<int?>("WinnerId");

                    b.HasKey("Id");

                    b.HasIndex("CompetitionId");

                    b.HasIndex("WinnerId");

                    b.ToTable("Seasons");
                });

            modelBuilder.Entity("FootballApp.Data.DbModels.Standing", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Draw");

                    b.Property<int>("GoalDifference");

                    b.Property<int>("GoalsAgainst");

                    b.Property<int>("GoalsFor");

                    b.Property<int>("Lost");

                    b.Property<int>("PlayedGames");

                    b.Property<int>("Points");

                    b.Property<int>("Position");

                    b.Property<int>("TeamId");

                    b.Property<string>("Type");

                    b.Property<int>("Won");

                    b.HasKey("Id");

                    b.HasIndex("TeamId");

                    b.ToTable("Standings");
                });

            modelBuilder.Entity("FootballApp.Data.DbModels.Team", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address");

                    b.Property<string>("ClubColors");

                    b.Property<int>("CompetitionId");

                    b.Property<string>("CrestUrl");

                    b.Property<int>("Founded");

                    b.Property<string>("Name");

                    b.Property<string>("ShortName");

                    b.Property<string>("Venue");

                    b.Property<string>("Website");

                    b.HasKey("Id");

                    b.HasIndex("CompetitionId");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("FootballApp.Data.DbModels.Player", b =>
                {
                    b.HasOne("FootballApp.Data.DbModels.Team", "Team")
                        .WithMany()
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("FootballApp.Data.DbModels.Season", b =>
                {
                    b.HasOne("FootballApp.Data.DbModels.Competition", "Competition")
                        .WithMany("Seasons")
                        .HasForeignKey("CompetitionId");

                    b.HasOne("FootballApp.Data.DbModels.Team", "Winner")
                        .WithMany()
                        .HasForeignKey("WinnerId");
                });

            modelBuilder.Entity("FootballApp.Data.DbModels.Standing", b =>
                {
                    b.HasOne("FootballApp.Data.DbModels.Team", "Team")
                        .WithMany()
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("FootballApp.Data.DbModels.Team", b =>
                {
                    b.HasOne("FootballApp.Data.DbModels.Competition", "Competition")
                        .WithMany()
                        .HasForeignKey("CompetitionId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
