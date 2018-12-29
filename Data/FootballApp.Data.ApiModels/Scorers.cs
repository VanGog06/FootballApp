using System.Collections.Generic;
using RestSharp.Deserializers;

namespace FootballApp.Data.ApiModels
{
    public class Scorers
    {
        [DeserializeAs(Name = "Scorers")]
        public IEnumerable<Scorer> ScorersCollection { get; set; }
    }
}
