using System.Collections.Generic;
using FootballApp.Services.Dtos.Standings;

namespace FootballApp.Services.DataServices.Contracts
{
    public interface IStandingService
    {
        ICollection<StandingDto> GetByCountry(string country);
    }
}
