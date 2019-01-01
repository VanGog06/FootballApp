using System.ComponentModel.DataAnnotations;

namespace FootballApp.Services.Dtos.Users
{
    public class UpdateUserPasswordDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MinLength(4)]
        public string OldPassword { get; set; }

        [Required]
        [MinLength(4)]
        public string NewPassword { get; set; }
    }
}
