using System.Collections.Generic;
using RestSharp.Deserializers;

namespace FootballApp.Data.ApiModels
{
    public class Teams
    {
        [DeserializeAs(Name = "Teams")]
        public IEnumerable<Team> TeamsCollection { get; set; }
    }
}
