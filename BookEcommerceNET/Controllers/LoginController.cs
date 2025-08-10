using BookEcommerceNET.DTO;
using BookEcommerceNET.Models;
using BookEcommerceNET.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookEcommerceNET.Controllers
{

    [ApiController]
    public class LginController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;

        public LginController(IUserService userService , ITokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO dto)
        {
            var user = await _userService.Authenticate(dto.Email, dto.Password);

            if (user == null)
            {
                return Unauthorized("Invalid username or password"); 
            }

            var token = _tokenService.GenerateToken(user);
            return Ok(new
            {
                jwt = token,
                id = user.Id,    
                name = user.UserName,
                role = user.Role
            });
        }
    }
}
