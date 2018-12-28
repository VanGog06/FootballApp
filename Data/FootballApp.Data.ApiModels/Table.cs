using System.Collections.Generic;
using RestSharp.Deserializers;

namespace FootballApp.Data.ApiModels
{
    public class Table
    {
        public string Type { get; set; }

        [DeserializeAs(Name = "Table")]
        public IEnumerable<Standing> TableCollection { get; set; }
    }
}
