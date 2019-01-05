using FootballApp.Services.DataServices.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FootballApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompetitionsController : ControllerBase
    {
        private readonly ICompetitionService competitionService;

        public CompetitionsController(ICompetitionService competitionService)
        {
            this.competitionService = competitionService;
        }

        [AllowAnonymous]
        [HttpGet("all")]
        public ActionResult GetAll()
        {
            var competitions = this.competitionService.GetAll();

            return Ok(competitions);
        }
    }
}