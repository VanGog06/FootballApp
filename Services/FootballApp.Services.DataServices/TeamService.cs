using System.Collections.Generic;
using System.Linq;
using FootballApp.Data;
using FootballApp.Services.DataServices.Contracts;
using FootballApp.Services.Dtos;
using FootballApp.Services.Dtos.Teams;

namespace FootballApp.Services.DataServices
{
    public class TeamService : ITeamService
    {
        private readonly FootballAppContext context;

        public TeamService(FootballAppContext context)
        {
            this.context = context;
        }

        public TeamDto GetById(int id)
        {
            var team = this.context.Teams.Find(id);

            var players = this.context.Players
                .Where(p => p.TeamId == team.Id)
                .Select(p => new PlayerDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Role = p.Role,
                    Position = p.Position,
                    CountryOfBirth = p.CountryOfBirth,
                    DateOfBirth = p.DateOfBirth.ToString("dd-MM-yyyy"),
                    ShirtNumber = p.ShirtNumber,
                    Nationality = p.Nationality
                })
                .ToList();

            var teamDto = new TeamDto
            {
                Id = team.Id,
                Name = team.Name,
                ShortName = team.ShortName,
                Address = team.Address,
                Website = team.Website,
                CrestUrl = team.CrestUrl,
                Venue = team.Venue,
                Founded = team.Founded,
                ClubColors = team.ClubColors,
                Players = players
            };

            return teamDto;
        }
    }
}
