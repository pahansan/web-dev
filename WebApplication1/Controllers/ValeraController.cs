using Microsoft.AspNetCore.Mvc;
using WebApplication1.Services;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ValeraController : ControllerBase
    {
        private readonly ValeraService _valeraService;

        public ValeraController(ValeraService valeraService)
        {
            _valeraService = valeraService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Valera>> Get(int id)
        {
            var valera = await _valeraService.GetValeraAsync(id);
            if (valera == null) return NotFound();
            return Ok(valera);
        }

        [HttpPost]
        public async Task<ActionResult<Valera>> Create()
        {
            var newValera = await _valeraService.CreateValeraAsync();
            return CreatedAtAction(nameof(Get), new { id = newValera.Id }, newValera);
        }

        [HttpPost("{id}/action")]
        public async Task<ActionResult<Valera>> DoAction(int id, [FromBody] ValeraAction action)
        {
            var valera = await _valeraService.GetValeraAsync(id);
            if (valera == null) return NotFound();

            switch (action)
            {
                case ValeraAction.GoWork:
                    var success = valera.GoWork();
                    if (!success)
                        return BadRequest(new { message = "Valera is too tired or doesn't have enough mana to work." });
                    break;

                case ValeraAction.LookForNature:
                    valera.LookForNature();
                    break;

                case ValeraAction.DrinkWineAndWatchTV:
                    valera.DrinkWineAndWatchTV();
                    break;

                case ValeraAction.GoToBar:
                    valera.GoToBar();
                    break;

                case ValeraAction.DrinkWithMarginals:
                    valera.DrinkWithMarginals();
                    break;

                case ValeraAction.SingInSubway:
                    valera.SingInSubway();
                    break;

                case ValeraAction.Sleep:
                    valera.Sleep();
                    break;

                default:
                    return BadRequest($"Unknown action: {action}");
            }

            await _valeraService.UpdateValeraAsync(valera);
            return Ok(valera);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Valera valera)
        {
            if (id != valera.Id) return BadRequest();
            await _valeraService.UpdateValeraAsync(valera);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _valeraService.DeleteValeraAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
