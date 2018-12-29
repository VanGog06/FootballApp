using FootballApp.Services.DataServices.Contracts;
using FootballApp.Services.Models.Users;
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
        public IActionResult Authenticate([FromBody] UserViewModel viewModel)
        {
            var user = this.userService.Authenticate(viewModel.Username, viewModel.Password);

            if (user == null)
            {
                return BadRequest(new {message = "Username or password is incorrect!"});
            }

            return Ok(user);
        }

        [Authorize(Roles = "Admin")]
        public IActionResult GetAll()
        {
            var users = this.userService.GetAll();

            return Ok(users);
        }
    }
}