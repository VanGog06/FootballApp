using System.ComponentModel.DataAnnotations;

namespace FootballApp.Services.Dtos.Users
{
    public class UpdateUserAccountDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MinLength(4)]
        public string Password { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        [EmailAddress]
        public string Email { get; set; }
    }
}
