using System.ComponentModel.DataAnnotations;

namespace FootballApp.Services.Dtos.Users
{
    public class UserWithoutPasswordDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MinLength(4)]
        public string Username { get; set; }

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
