using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ValeraSan.Services;
using ValeraSan.Models;
using ValeraSan.DTOs;

namespace ValeraSan.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(RegisterRequest request)
        {
            var user = await _authService.RegisterAsync(request);
            if (user == null)
            {
                return BadRequest("User with this email already exists.");
            }

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login(LoginRequest request)
        {
            var token = await _authService.LoginAsync(request);
            if (token == null)
            {
                return BadRequest("Wrong email or password.");
            }

            var user = await _authService.GetUserByEmailAsync(request.Email);

            return Ok(new LoginResponse
            {
                Token = token,
                Role = user?.Role ?? "User",
                UserId = user?.Id ?? 0
            });
        }
    }
}
