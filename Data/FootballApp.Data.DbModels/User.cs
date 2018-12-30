using FootballApp.Data.Common;

namespace FootballApp.Data.DbModels
{
    public class User : BaseModel<int>
    {
        public string Username { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }
    }
}
