using FootballApp.Data.Common;

namespace FootballApp.Data.DbModels
{
    public class Team : BaseModel<int>
    {
        public string Name { get; set; }

        public string ShortName { get; set; }

        public string CrestUrl { get; set; }

        public string Address { get; set; }

        public string Website { get; set; }

        public int Founded { get; set; }

        public string ClubColors { get; set; }

        public string Venue { get; set; }

        public int CompetitionId { get; set; }

        public virtual Competition Competition { get; set; }
    }
}
