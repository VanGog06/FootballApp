using System;

namespace FootballApp.Data.ApiModels
{
    public class Player
    {
        public string Name { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string CountryOfBirth { get; set; }

        public string Nationality { get; set; }

        public string Position { get; set; }

        public int ShirtNumber { get; set; }

        public string Role { get; set; }
    }
}
