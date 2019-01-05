using System.Collections.Generic;
using FootballApp.Services.Dtos.Competitions;

namespace FootballApp.Services.DataServices.Contracts
{
    public interface ICompetitionService
    {
        ICollection<CompetitionDto> GetAll();
    }
}
