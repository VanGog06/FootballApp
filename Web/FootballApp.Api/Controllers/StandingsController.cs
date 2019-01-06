using FootballApp.Services.DataServices.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FootballApp.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StandingsController : ControllerBase
    {
        private readonly IStandingService standingService;

        public StandingsController(IStandingService standingService)
        {
            this.standingService = standingService;
        }

        [HttpGet("standing/{country}")]
        public ActionResult GetStandingByCountry(string country)
        {
            var standings = this.standingService.GetByCountry(country);

            return Ok(standings);
        }
    }
}