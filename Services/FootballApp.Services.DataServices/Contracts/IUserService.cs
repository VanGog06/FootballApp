using System.Collections.Generic;
using FootballApp.Services.Dtos.Users;

namespace FootballApp.Services.DataServices.Contracts
{
    public interface IUserService
    {
        UserWithoutPasswordDto Authenticate(UsernamePasswordDto usernamePasswordDto);

        IEnumerable<UserWithoutPasswordDto> GetAll();

        UserDto Create(UserDto userDto);

        void ChangePassword(UpdateUserPasswordDto dto);

        void UpdateAccountInfo(UpdateUserAccountDto dto);

        void Delete(DeleteUserDto dto);
    }
}
