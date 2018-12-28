using System.Collections.Generic;
using RestSharp.Deserializers;

namespace FootballApp.Data.ApiModels
{
    public class Standings
    {
        [DeserializeAs(Name = "Standings")]
        public IEnumerable<Table> StandingsCollection { get; set; }
    }
}
