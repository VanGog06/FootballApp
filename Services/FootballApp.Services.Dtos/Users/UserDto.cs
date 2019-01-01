using System.ComponentModel.DataAnnotations;

namespace FootballApp.Services.Dtos.Users
{
    public class UserDto
    {
        [Required]
        [MinLength(4)]
        public string Username { get; set; }

        [Required]
        [MinLength(4)]
        public string Password { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string Token { get; set; }
    }
}
