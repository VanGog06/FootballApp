using FootballApp.Services.DataServices.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FootballApp.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly ITeamService teamService;

        public TeamsController(ITeamService teamService)
        {
            this.teamService = teamService;
        }

        [HttpGet("{country}")]
        public ActionResult GetByCountry(string country)
        {
            var teams = this.teamService.GetByCountry(country);

            return Ok(teams);
        }
    }
}