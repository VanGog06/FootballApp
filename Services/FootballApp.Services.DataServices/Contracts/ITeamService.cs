using FootballApp.Services.Dtos.Teams;

namespace FootballApp.Services.DataServices.Contracts
{
    public interface ITeamService
    {
        TeamDto GetById(int id);
    }
}
