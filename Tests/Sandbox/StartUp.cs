using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
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
        private static readonly List<int> CompetitionsIds = new List<int>
        {
            2002, 2003, 2014, 2015, 2019, 2021
        };

        private static readonly List<int> TeamsIds = new List<int>
        {
            2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 24, 721,
            668, 670, 671, 672, 673, 674, 675, 676, 677, 678, 679, 680, 681, 682, 684, 1913, 1914, 1920,
            77, 78, 80, 81, 82, 86, 87, 88, 90, 92, 94, 95, 250, 263, 278, 298, 299, 558, 559, 745,
            511, 514, 516, 518, 521, 522, 523, 524, 526, 527, 528, 529, 530, 532, 538, 543, 547, 548, 556, 576,
            98, 99, 100, 102, 103, 104, 106, 107, 108, 109, 110, 112, 113, 115, 445, 470, 471, 584, 586, 1107,
            57, 61, 62, 63, 64, 65, 66, 67, 73, 76, 328, 338, 340, 346, 354, 394, 397, 563, 715, 1044
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
                //SeedSeasons(client, serviceProvider);
                //SeedStandings(client, serviceProvider);
                //SeedPlayers(client, serviceProvider);
                SeedNumberOfGoals(client, serviceProvider);
            }
        }

        private static void SeedCompetitions(FootballClient client, IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetService<FootballAppContext>();

            var responses = new List<Competition>();

            foreach (int id in CompetitionsIds)
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

            foreach (int id in CompetitionsIds)
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

            foreach (int id in CompetitionsIds)
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

        private static void SeedStandings(FootballClient client, IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetService<FootballAppContext>();

            var responses = new List<Standings>();

            foreach (int id in CompetitionsIds)
            {
                var response = client.Get<Standings>("competitions/{id}/standings", id);
                responses.Add(response);
            }

            foreach (Standings response in responses)
            {
                foreach (Table table in response.StandingsCollection)
                {
                    string type = table.Type;

                    foreach (Standing responseStanding in table.TableCollection)
                    {
                        string teamName = responseStanding.Team.Name;
                        var databaseTeam = context.Teams.FirstOrDefault(t => t.Name == teamName);

                        if (databaseTeam == null) continue;

                        var standing = new FootballApp.Data.DbModels.Standing
                        {
                            Draw = responseStanding.Draw,
                            GoalDifference = responseStanding.GoalDifference,
                            GoalsAgainst = responseStanding.GoalsAgainst,
                            GoalsFor = responseStanding.GoalsFor,
                            Lost = responseStanding.Lost,
                            PlayedGames = responseStanding.PlayedGames,
                            Points = responseStanding.Points,
                            Position = responseStanding.Position,
                            TeamId = databaseTeam.Id,
                            Won = responseStanding.Won,
                            Type = char.ToUpper(type[0]) + type.Substring(1)
                    };

                        context.Standings.AddRange(standing);
                    }
                }
            }

            context.SaveChanges();
        }

        private static void SeedPlayers(FootballClient client, IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetService<FootballAppContext>();

            var responses = new List<Squad>();
            var counter = 0;


            foreach (int id in TeamsIds)
            {
                counter++;

                var response = client.Get<Squad>("teams/{id}", id);

                if (counter % 11 == 0)
                {
                    Console.WriteLine("Waiting...");
                    Thread.Sleep(new TimeSpan(0, 0, 1, 0));
                }
                else
                {
                    Console.WriteLine($"Added {response.Name}");
                    responses.Add(response);
                }
            }

            foreach (Squad response in responses)
            {
                var name = response.Name;

                foreach (Player playerResponse in response.SquadCollection)
                {
                    var databaseTeam = context.Teams.FirstOrDefault(t => t.Name == name);

                    if (databaseTeam == null)
                    {
                        continue;
                    }

                    var player = new FootballApp.Data.DbModels.Player
                    {
                        CountryOfBirth = playerResponse.CountryOfBirth,
                        DateOfBirth = playerResponse.DateOfBirth,
                        Name = playerResponse.Name,
                        Nationality = playerResponse.Nationality,
                        Position = playerResponse.Position,
                        Role = playerResponse.Role,
                        ShirtNumber = playerResponse.ShirtNumber,
                        TeamId = databaseTeam.Id
                    };

                    context.Players.AddRange(player);
                }
            }

            context.SaveChanges();
        }

        private static void SeedNumberOfGoals(FootballClient client, IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetService<FootballAppContext>();

            var responses = new List<Scorers>();

            foreach (int id in CompetitionsIds)
            {
                var response = client.Get<Scorers>("competitions/{id}/scorers", id);
                responses.Add(response);
            }

            foreach (Scorers response in responses)
            {
                foreach (Scorer responseScorer in response.ScorersCollection)
                {
                    var player = context.Players.FirstOrDefault(p => p.Name == responseScorer.Player.Name);

                    if (player == null) continue;

                    player.NumberOfGoals = responseScorer.NumberOfGoals;

                    Console.WriteLine($"{responseScorer.Player.Name} => {responseScorer.NumberOfGoals}");
                    context.Players.UpdateRange(player);
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
