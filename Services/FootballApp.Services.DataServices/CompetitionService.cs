using System.Collections.Generic;
using System.Linq;
using FootballApp.Data;
using FootballApp.Services.DataServices.Contracts;
using FootballApp.Services.Dtos.Competitions;

namespace FootballApp.Services.DataServices
{
    public class CompetitionService : ICompetitionService
    {
        private readonly FootballAppContext context;

        public CompetitionService(FootballAppContext context)
        {
            this.context = context;
        }

        public ICollection<CompetitionDto> GetAll()
        {
            return this.context.Competitions
                .Where(c => c.Name != "Championship")
                .Select(c => new CompetitionDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Country = c.Country
                })
                .ToList();
        }
    }
}
