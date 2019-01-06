using System.Collections.Generic;
using System.Linq;
using FootballApp.Data;
using FootballApp.Services.DataServices.Contracts;
using FootballApp.Services.Dtos.Standings;
using FootballApp.Services.Dtos.Teams;
using Microsoft.EntityFrameworkCore;

namespace FootballApp.Services.DataServices
{
    public class StandingService : IStandingService
    {
        private readonly FootballAppContext context;

        public StandingService(FootballAppContext context)
        {
            this.context = context;
        }

        public ICollection<StandingDto> GetByCountry(string country)
        {
            var standings = this.context.Standings
                .Include(s => s.Team)
                .Include(s => s.Team.Competition)
                .Where(s => s.Team.Competition.Country.ToLower() == country && s.Type == "TOTAL" && s.PlayedGames <= 19)
                .Select(s => new StandingDto
                {
                    Id = s.Id,
                    Name = s.Team.Competition.Name,
                    TeamId = s.TeamId,
                    Position = s.Position,
                    Won = s.Won,
                    Lost = s.Lost,
                    GoalDifference = s.GoalDifference,
                    GoalsFor = s.GoalsFor,
                    Points = s.Points,
                    Draw = s.Draw,
                    PlayedGames = s.PlayedGames,
                    GoalsAgainst = s.GoalsAgainst,
                    Team = new TeamDto
                    {
                        Id = s.Team.Id,
                        Name = s.Team.Name,
                        ShortName = s.Team.ShortName,
                        Address = s.Team.Address,
                        Website = s.Team.Website,
                        CrestUrl = s.Team.CrestUrl,
                        Venue = s.Team.Venue,
                        Founded = s.Team.Founded,
                        ClubColors = s.Team.ClubColors
                    }
                })
                .ToList();

            return standings;
        }
    }
}
