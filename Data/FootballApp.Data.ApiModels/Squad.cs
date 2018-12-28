using System.Collections.Generic;
using RestSharp.Deserializers;

namespace FootballApp.Data.ApiModels
{
    public class Squad
    {
        public string Name { get; set; }

        [DeserializeAs(Name = "Squad")]
        public IEnumerable<Player> SquadCollection { get; set; }
    }
}
