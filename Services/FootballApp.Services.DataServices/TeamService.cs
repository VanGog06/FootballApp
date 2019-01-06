using System.Collections.Generic;
using System.Linq;
using FootballApp.Data;
using FootballApp.Services.DataServices.Contracts;
using FootballApp.Services.Dtos.Teams;
using Microsoft.EntityFrameworkCore;

namespace FootballApp.Services.DataServices
{
    public class TeamService : ITeamService
    {
        private readonly FootballAppContext context;

        public TeamService(FootballAppContext context)
        {
            this.context = context;
        }

        public ICollection<TeamDto> GetByCountry(string country)
        {
            var teams = this.context.Teams
                .Include(t => t.Competition)
                .Where(t => t.Competition.Country == country)
                .Select(t => new TeamDto
                {
                    Id = t.Id,
                    Name = t.Name,
                    ShortName = t.ShortName,
                    Address = t.Address,
                    Website = t.Website,
                    CrestUrl = t.CrestUrl,
                    Venue = t.Venue,
                    Founded = t.Founded,
                    ClubColors = t.ClubColors
                })
                .ToList();

            return teams;
        }
    }
}
