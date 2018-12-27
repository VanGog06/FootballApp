using System;

namespace FootballApp.Data.ApiModels
{
    public class Season
    {
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int? CurrentMatchday { get; set; }

        public Team Winner { get; set; }
    }
}
