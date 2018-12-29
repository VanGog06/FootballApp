using FootballApp.Services.Models.Common;

namespace FootballApp.Services.Models.Users
{
    public class UserViewModel : BaseModel<int>
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public string FirstName { get; set; }

        public string Lastname { get; set; }

        public string Email { get; set; }

        public string Token { get; set; }
    }
}
