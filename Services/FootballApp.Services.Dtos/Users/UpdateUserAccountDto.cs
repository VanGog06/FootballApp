﻿namespace FootballApp.Services.Dtos.Users
{
    public class UpdateUserAccountDto
    {
        public int Id { get; set; }

        public string Password { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }
    }
}
