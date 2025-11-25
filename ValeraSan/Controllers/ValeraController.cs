using Microsoft.AspNetCore.Mvc;
using ValeraSan.Services;
using ValeraSan.Models;
using ValeraSan.DTOs;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace ValeraSan.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ValeraController : ControllerBase
    {
        private readonly ValeraService _valeraService;

        public ValeraController(ValeraService valeraService)
        {
            _valeraService = valeraService;
        }

        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            {
                throw new UnauthorizedAccessException("User ID not found in token");
            }
            return userId;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<List<Valera>>> GetAll()
        {
            var valeras = await _valeraService.GetAllValerasAsync();
            return Ok(valeras);
        }

        [HttpGet("my")]
        public async Task<ActionResult<List<Valera>>> GetMyValeras()
        {
            var userId = GetCurrentUserId();
            var valeras = await _valeraService.GetValerasByUserIdAsync(userId);
            return Ok(valeras);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Valera>> Get(int id)
        {
            var userId = GetCurrentUserId();
            var isAdmin = User.IsInRole("Admin");

            var valera = await _valeraService.GetValeraAsync(id);
            if (valera == null) return NotFound();

            if (!isAdmin && valera.UserId != userId)
                return Forbid();

            return Ok(valera);
        }

        [HttpPost]
        public async Task<ActionResult<Valera>> Create([FromBody] CreateRequest req)
        {
            if (req == null)
                return BadRequest(new { message = "Missed data" });

            var userId = GetCurrentUserId();
            var newValera = await _valeraService.CreateValeraAsync(req, userId);
            return CreatedAtAction(nameof(Get), new { id = newValera.Id }, newValera);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = GetCurrentUserId();
            var isAdmin = User.IsInRole("Admin");

            var valera = await _valeraService.GetValeraAsync(id);
            if (valera == null) return NotFound();

            if (!isAdmin && valera.UserId != userId)
                return Forbid();

            var success = await _valeraService.DeleteValeraAsync(id);
            if (!success) return NotFound();

            return Ok(new { deleted = true, id });
        }

        [HttpPost("{id}/gowork")]
        public async Task<ActionResult<Valera>> GoWork(int id)
        {
            var userId = GetCurrentUserId();
            var isAdmin = User.IsInRole("Admin");

            var valera = await _valeraService.GetValeraAsync(id);
            if (valera == null) return NotFound();

            if (!isAdmin && valera.UserId != userId)
                return Forbid();

            var result = await _valeraService.GoWorkAsync(valera);
            if (!result.Item2)
                return BadRequest(new { message = "Valera is too tired or doesn't have enough mana to work." });

            return Ok(result.Item1);
        }

        [HttpPost("{id}/lookfornature")]
        public async Task<ActionResult<Valera>> LookForNature(int id)
        {
            var userId = GetCurrentUserId();
            var isAdmin = User.IsInRole("Admin");

            var valera = await _valeraService.GetValeraAsync(id);
            if (valera == null) return NotFound();

            if (!isAdmin && valera.UserId != userId)
                return Forbid();

            await _valeraService.LookForNatureAsync(valera);
            return Ok(valera);
        }

        [HttpPost("{id}/drinkwineandwatchtv")]
        public async Task<ActionResult<Valera>> DrinkWineAndWatchTV(int id)
        {
            var userId = GetCurrentUserId();
            var isAdmin = User.IsInRole("Admin");

            var valera = await _valeraService.GetValeraAsync(id);
            if (valera == null) return NotFound();

            if (!isAdmin && valera.UserId != userId)
                return Forbid();

            await _valeraService.DrinkWineAndWatchTVAsync(valera);
            return Ok(valera);
        }

        [HttpPost("{id}/gotobar")]
        public async Task<ActionResult<Valera>> GoToBar(int id)
        {
            var userId = GetCurrentUserId();
            var isAdmin = User.IsInRole("Admin");

            var valera = await _valeraService.GetValeraAsync(id);
            if (valera == null) return NotFound();

            if (!isAdmin && valera.UserId != userId)
                return Forbid();

            await _valeraService.GoToBarAsync(valera);
            return Ok(valera);
        }

        [HttpPost("{id}/drinkwithmarginals")]
        public async Task<ActionResult<Valera>> DrinkWithMarginals(int id)
        {
            var userId = GetCurrentUserId();
            var isAdmin = User.IsInRole("Admin");

            var valera = await _valeraService.GetValeraAsync(id);
            if (valera == null) return NotFound();

            if (!isAdmin && valera.UserId != userId)
                return Forbid();

            await _valeraService.DrinkWithMarginalsAsync(valera);
            return Ok(valera);
        }

        [HttpPost("{id}/singinsubway")]
        public async Task<ActionResult<Valera>> SingInSubway(int id)
        {
            var userId = GetCurrentUserId();
            var isAdmin = User.IsInRole("Admin");

            var valera = await _valeraService.GetValeraAsync(id);
            if (valera == null) return NotFound();

            if (!isAdmin && valera.UserId != userId)
                return Forbid();

            await _valeraService.SingInSubwayAsync(valera);
            return Ok(valera);
        }

        [HttpPost("{id}/sleep")]
        public async Task<ActionResult<Valera>> Sleep(int id)
        {
            var userId = GetCurrentUserId();
            var isAdmin = User.IsInRole("Admin");

            var valera = await _valeraService.GetValeraAsync(id);
            if (valera == null) return NotFound();

            if (!isAdmin && valera.UserId != userId)
                return Forbid();

            await _valeraService.SleepAsync(valera);
            return Ok(valera);
        }
    }
}
