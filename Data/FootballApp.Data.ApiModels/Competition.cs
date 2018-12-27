using System.Collections.Generic;

namespace FootballApp.Data.ApiModels
{
    public class Competition
    {
        public Competition()
        {
            this.Seasons = new HashSet<Season>();
        }

        public string Name { get; set; }

        public Area Area { get; set; }

        public IEnumerable<Season> Seasons { get; set; }
    }
}
