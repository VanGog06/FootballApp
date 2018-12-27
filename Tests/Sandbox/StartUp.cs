using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using FootballApp.Data;
using FootballApp.Data.ApiModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Competition = FootballApp.Data.ApiModels.Competition;
using Season = FootballApp.Data.ApiModels.Season;
using Team = FootballApp.Data.ApiModels.Team;

namespace Sandbox
{
    class StartUp
    {
        private static readonly List<int> CompetitionIds = new List<int>
        {
            2002, 2003, 2014, 2015, 2016, 2019, 2021
        };

        static void Main(string[] args)
        {
            FootballClient client = new FootballClient();

            var serviceCollection = new ServiceCollection();
            ConfigureServices(serviceCollection);
            IServiceProvider serviceProvider = serviceCollection.BuildServiceProvider(true);

            using (var serviceScope = serviceProvider.CreateScope())
            {
                serviceProvider = serviceScope.ServiceProvider;
                //SeedCompetitions(client, serviceProvider);
                //SeedTeams(client, serviceProvider);
                SeedSeasons(client, serviceProvider);
            }
        }

        private static void SeedCompetitions(FootballClient client, IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetService<FootballAppContext>();

            var responses = new List<Competition>();

            foreach (int id in CompetitionIds)
            {
                var response = client.Get<Competition>("competitions/{id}", id);
                responses.Add(response);
            }

            foreach (Competition response in responses)
            {
                var competition = new FootballApp.Data.DbModels.Competition
                {
                    Name = response.Name,
                    Country = response.Area.Name
                };
            
                context.Competitions.AddRange(competition);
            }

            context.SaveChanges();
        }

        private static void SeedTeams(FootballClient client, IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetService<FootballAppContext>();

            var responses = new List<Teams>();

            foreach (int id in CompetitionIds)
            {
                var response = client.Get<Teams>("competitions/{id}/teams", id);
                responses.Add(response);
            }

            foreach (Teams response in responses)
            {
                foreach (Team responseTeam in response.TeamsCollection)
                {
                    var competition = context.Competitions.FirstOrDefault(c => c.Country == responseTeam.Area.Name);

                    if (competition == null && responseTeam.Area.Name == "Monaco")
                    {
                        competition = context.Competitions.First(c => c.Country == "France");
                    }

                    if (competition == null && responseTeam.Area.Name == "Wales")
                    {
                        competition = context.Competitions.First(c => c.Country == "England");
                    }

                    var team = new FootballApp.Data.DbModels.Team
                    {
                        Address = responseTeam.Address,
                        ClubColors = responseTeam.ClubColors,
                        CrestUrl = responseTeam.CrestUrl,
                        Founded = responseTeam.Founded,
                        Name = responseTeam.Name,
                        ShortName = responseTeam.ShortName,
                        Venue = responseTeam.Venue,
                        Website = responseTeam.Website,
                        CompetitionId = competition.Id
                    };

                    context.Teams.AddRange(team);
                }
            }

            context.SaveChanges();
        }

        private static void SeedSeasons(FootballClient client, IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetService<FootballAppContext>();

            var responses = new List<Competition>();

            foreach (int id in CompetitionIds)
            {
                var response = client.Get<Competition>("competitions/{id}", id);
                responses.Add(response);
            }

            foreach (Competition response in responses)
            {
                foreach (Season responseSeason in response.Seasons)
                {
                    if (responseSeason.Winner != null)
                    {
                        var winner = context.Teams.FirstOrDefault(t => t.Name == responseSeason.Winner.Name);

                        if (winner == null)
                        {
                            continue;
                        }

                        var season = new FootballApp.Data.DbModels.Season
                        {
                            CurrentMatchday = responseSeason.CurrentMatchday,
                            EndDate = responseSeason.EndDate,
                            StartDate = responseSeason.StartDate,
                            WinnerId = winner.Id,
                            CompetitionId = winner.CompetitionId
                        };

                        context.Seasons.AddRange(season);
                    }
                }
            }

            context.SaveChanges();
        }

        private static void ConfigureServices(ServiceCollection services)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", false, true)
                .Build();

            services.AddDbContext<FootballAppContext>(options =>
                options.UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection")));
        }
    }
}
