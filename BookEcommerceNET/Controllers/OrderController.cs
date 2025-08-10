using BookEcommerceNET.DTO;
using BookEcommerceNET.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookEcommerceNET.Controllers
{
    [ApiController]
    [Route("customer")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [Authorize]
        [HttpPost("createOrder")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
        {
            try
            {
                var result = await _orderService.CreateOrderAsync(request);
                return CreatedAtAction(nameof(CreateOrder), result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Order creation failed: {ex.Message}");
            }
        }

        [Authorize]
        [HttpGet("getOrdersByUserId/{id}")]
        public async Task<ActionResult<List<OrderDtoResponse>>> GetOrdersByUserId(long id)
        {
            var orders = await _orderService.GetOrdersByUserIdAsync(id);
            return Ok(orders);
        }
    }

}
