namespace FootballApp.Data.ApiModels
{
    public class Team
    {
        public string Name { get; set; }

        public string ShortName { get; set; }

        public string CrestUrl { get; set; }

        public string Address { get; set; }

        public string Website { get; set; }

        public int Founded { get; set; }

        public string ClubColors { get; set; }

        public string Venue { get; set; }

        public Area Area { get; set; }
    }
}
