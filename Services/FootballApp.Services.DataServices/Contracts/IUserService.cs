using System.Collections.Generic;
using FootballApp.Services.Dtos.Users;

namespace FootballApp.Services.DataServices.Contracts
{
    public interface IUserService
    {
        UserWithoutPasswordDto Authenticate(UsernamePasswordDto usernamePasswordDto);

        UserDto Create(UserDto userDto);

        void ChangePassword(UpdateUserPasswordDto dto);

        UserWithoutPasswordDto UpdateAccountInfo(UpdateUserAccountDto dto);

        void Delete(DeleteUserDto dto);
    }
}
