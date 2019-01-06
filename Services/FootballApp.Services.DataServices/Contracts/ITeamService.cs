using System.Collections.Generic;
using FootballApp.Services.Dtos.Teams;

namespace FootballApp.Services.DataServices.Contracts
{
    public interface ITeamService
    {
        ICollection<TeamDto> GetByCountry(string country);
    }
}
