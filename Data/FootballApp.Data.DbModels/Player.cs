using System;
using FootballApp.Data.Common;

namespace FootballApp.Data.DbModels
{
    public class Player : BaseModel<int>
    {
        public string Name { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string CountryOfBirth { get; set; }

        public string Nationality { get; set; }

        public string Position { get; set; }

        public int? ShirtNumber { get; set; }

        public string Role { get; set; }

        public int NumberOfGoals { get; set; }

        public int TeamId { get; set; }

        public virtual Team Team { get; set; }
    }
}
