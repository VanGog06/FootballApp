﻿namespace FootballApp.Services.Dtos.Users
{
    public class UpdateUserPasswordDto
    {
        public int Id { get; set; }

        public string OldPassword { get; set; }

        public string NewPassword { get; set; }
    }
}
