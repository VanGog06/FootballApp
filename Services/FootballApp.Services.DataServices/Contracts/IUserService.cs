using System.Collections;
using System.Collections.Generic;
using FootballApp.Services.Models.Users;

namespace FootballApp.Services.DataServices.Contracts
{
    public interface IUserService
    {
        UserViewModel Authenticate(string username, string password);
        IEnumerable<UserViewModel> GetAll();
    }
}
