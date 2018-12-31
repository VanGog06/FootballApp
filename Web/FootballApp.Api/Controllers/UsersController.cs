using System;
using FootballApp.Services.DataServices.Contracts;
using FootballApp.Services.Dtos.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FootballApp.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService userService;

        public UsersController(IUserService userService)
        {
            this.userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] UsernamePasswordDto usernamePasswordDto)
        {
            var user = this.userService.Authenticate(usernamePasswordDto);

            if (user == null)
            {
                return BadRequest(new {message = "Username or password is incorrect!"});
            }

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] UserDto userDto)
        {
            try
            {
                var user = this.userService.Create(userDto);

                return Ok(user);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("changePassword/{id}")]
        public IActionResult ChangePassword(int id, [FromBody] UpdateUserPasswordDto dto)
        {
            try
            {
                dto.Id = id;
                this.userService.ChangePassword(dto);

                return Ok();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("updateAccount/{id}")]
        public IActionResult UpdateAccount(int id, [FromBody] UpdateUserAccountDto dto)
        {
            try
            {
                dto.Id = id;
                this.userService.UpdateAccountInfo(dto);

                return Ok();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id, [FromBody] DeleteUserDto dto)
        {
            try
            {
                dto.Id = id;
                this.userService.Delete(dto);

                return Ok();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        //[Authorize(Roles = "Admin")]
        public IActionResult GetAll()
        {
            var users = this.userService.GetAll();

            return Ok(users);
        }
    }
}