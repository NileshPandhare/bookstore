using BookEcommerceNET.DTO;
using BookEcommerceNET.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookEcommerceNET.Controllers
{
    [Route("customer")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [Authorize]
        [HttpPost("addToCart")]
        public async Task<IActionResult> AddToCart([FromBody] CartRequestDTO cartDto)
        {
            try
            {
                var result = await _cartService.AddToCartAsync(cartDto);
                return Created("", result);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("getCartByUserId/{id}")]
        public async Task<IActionResult> GetCartByUserId(long id)
        {
            try
            {
                var result = await _cartService.GetCartByUserIdAsync(id);
                if (!result.Any())
                    return NoContent();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Insufficient Stock");
            }
        }

        [Authorize]
        [HttpDelete("removeProductFromCart")]
        public async Task<IActionResult> RemoveProductFromCart([FromQuery] long userId, [FromQuery] long productId)
        {
            try
            {
                await _cartService.RemoveProductFromCartAsync(userId, productId);
                return Ok("Product removed from cart successfully.");
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }

}
