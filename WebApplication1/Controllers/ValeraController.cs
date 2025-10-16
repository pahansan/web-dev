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
        public async Task<ActionResult<Valera>> Create(Valera valera)
        {
            var newValera = await _valeraService.CreateValeraAsync(valera);
            return CreatedAtAction(nameof(Get), new { id = newValera.Id }, newValera);
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