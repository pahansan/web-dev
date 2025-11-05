using Microsoft.AspNetCore.Mvc;
using ValeraSan.Services;
using ValeraSan.Models;
using ValeraSan.DTOs;

namespace ValeraSan.Controllers
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

        [HttpGet]
        public async Task<ActionResult<List<Valera>>> GetAll()
        {
            var valeras = await _valeraService.GetAllValerasAsync();
            return Ok(valeras);
        }

        [HttpPost]
        public async Task<ActionResult<Valera>> Create([FromBody] CreateRequest req)
        {
            if (req == null)
            {
                return BadRequest(new { message = "Missed data" });
            }
            var newValera = await _valeraService.CreateValeraAsync(req);
            return CreatedAtAction(nameof(Get), new { id = newValera.Id }, newValera);
        }

        [HttpPost("{id}/gowork")]
        public async Task<ActionResult<Valera>> GoWork(int id)
        {
            var valera = await _valeraService.GetValeraAsync(id);
            if (valera == null) return NotFound();
            var result = await _valeraService.GoWorkAsync(valera);
            if (!result.Item2)
            {
                return BadRequest(new { message = "Valera is too tired or doesn't have enough mana to work." });
            }
            return Ok(result.Item1);
        }

        [HttpPost("{id}/lookfornature")]
        public async Task<ActionResult<Valera>> LookForNature(int id)
        {
            var valera = await _valeraService.GetValeraAsync(id);
            if (valera == null) return NotFound();
            await _valeraService.LookForNatureAsync(valera);
            return Ok(valera);
        }

        [HttpPost("{id}/drinkwineandwatchtv")]
        public async Task<ActionResult<Valera>> DrinkWineAndWatchTV(int id)
        {
            var valera = await _valeraService.GetValeraAsync(id);
            if (valera == null) return NotFound();
            await _valeraService.DrinkWineAndWatchTVAsync(valera);
            return Ok(valera);
        }

        [HttpPost("{id}/gotobar")]
        public async Task<ActionResult<Valera>> GoToBar(int id)
        {
            var valera = await _valeraService.GetValeraAsync(id);
            if (valera == null) return NotFound();
            await _valeraService.GoToBarAsync(valera);
            return Ok(valera);
        }

        [HttpPost("{id}/drinkwithmarginals")]
        public async Task<ActionResult<Valera>> DrinkWithMarginals(int id)
        {
            var valera = await _valeraService.GetValeraAsync(id);
            if (valera == null) return NotFound();
            await _valeraService.DrinkWithMarginalsAsync(valera);
            return Ok(valera);
        }

        [HttpPost("{id}/singinsubway")]
        public async Task<ActionResult<Valera>> SingInSubway(int id)
        {
            var valera = await _valeraService.GetValeraAsync(id);
            if (valera == null) return NotFound();
            await _valeraService.SingInSubwayAsync(valera);
            return Ok(valera);
        }

        [HttpPost("{id}/sleep")]
        public async Task<ActionResult<Valera>> Sleep(int id)
        {
            var valera = await _valeraService.GetValeraAsync(id);
            if (valera == null) return NotFound();
            await _valeraService.SleepAsync(valera);
            return Ok(valera);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _valeraService.DeleteValeraAsync(id);
            if (!success) return NotFound();
            return Ok(new { deleted = true, id });
        }
    }
}
