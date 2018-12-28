using FootballApp.Data.Common;

namespace FootballApp.Data.DbModels
{
    public class Standing : BaseModel<int>
    {
        public string Type { get; set; }

        public int Position { get; set; }

        public int PlayedGames { get; set; }

        public int Won { get; set; }

        public int Draw { get; set; }

        public int Lost { get; set; }

        public int Points { get; set; }

        public int GoalsFor { get; set; }

        public int GoalsAgainst { get; set; }

        public int GoalDifference { get; set; }

        public int TeamId { get; set; }

        public virtual Team Team { get; set; }
    }
}
