using System.ComponentModel.DataAnnotations;

namespace FootballApp.Services.Dtos.Users
{
    public class DeleteUserDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MinLength(4)]
        public string Password { get; set; }
    }
}
