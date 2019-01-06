using System.Collections.Generic;
using System.Linq;
using FootballApp.Data;
using FootballApp.Services.DataServices.Contracts;
using FootballApp.Services.Dtos.Standings;
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
                .Where(s => s.Team.Competition.Country.ToLower() == country && s.Type == "TOTAL")
                .Select(s => new StandingDto
                {
                    Id = s.Id,
                    TeamId = s.TeamId,
                    Position = s.Position,
                    Won = s.Won,
                    Lost = s.Lost,
                    GoalDifference = s.GoalDifference,
                    GoalsFor = s.GoalsFor,
                    Points = s.Points,
                    Draw = s.Draw,
                    PlayedGames = s.PlayedGames,
                    GoalsAgainst = s.GoalsAgainst
                })
                .ToList();

            return standings;
        }
    }
}
