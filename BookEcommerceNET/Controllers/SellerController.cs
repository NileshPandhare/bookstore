using BookEcommerceNET.DTO;
using BookEcommerceNET.Models;
using BookEcommerceNET.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookEcommerceNET.Controllers
{
    [Route("seller")]
    [ApiController]
    public class SellerController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IProductService _productService;
        private readonly IOrderService _orderService;
        private readonly IPaymentService _paymentService;
        private readonly IUserService _userService;


        public SellerController(ICategoryService categoryService, IProductService productService,
                              IOrderService orderService, IPaymentService paymentService, IUserService userService)
        {
            _categoryService = categoryService;
            _productService = productService;
            _orderService = orderService;
            _paymentService = paymentService;
            _userService = userService;
        }


        [Authorize]
        [HttpGet("getProductsBySellerId/{userId}")]
        public async Task<ActionResult<List<ProductDTO>>> GetProductsBySellerId(long userId)
        {
            var products = await _productService.GetProductsBySellerIdAsync(userId);

            if (products == null)
                return NotFound("No products found for this user");

            return Ok(products);
        }

        [Authorize]
        [HttpPost("addProduct")]
        public async Task<IActionResult> AddProduct([FromForm] ProductUploadDTO dto)
        {
            try
            {
                if (dto == null)
                    return BadRequest("Product data is required.");

                if (string.IsNullOrWhiteSpace(dto.ProductName))
                    return BadRequest("Product name is required.");

                if (dto.Price <= 0)
                    return BadRequest("Price must be greater than zero.");

                if (dto.Quantity < 0)
                    return BadRequest("Quantity cannot be negative.");

                var product = await _productService.AddProductAsync(dto);
                return Ok(product);
            }
            catch (Exception ex)
            {
                // Log the exception or output to console
                Console.WriteLine("Exception in AddProduct: " + ex.ToString());

                // Return generic message to client
                return StatusCode(500, "An unexpected error occurred while adding the product.");
            }
        }


        [AllowAnonymous]
        [HttpGet("getProductsByCategory/{id}")]
        public async Task<ActionResult<List<ProductDTO>>> GetProductsByCategory(long id)
        {
            var products = await _productService.GetProductsByCategoryAsync(id);
            return Ok(products);
        }



        [Authorize]
        [HttpGet("getSoldProductsBySeller/{userId}")]
        public async Task<ActionResult<List<SoldProductDTO>>> GetSoldProductsBySeller(long userId)
        {
            var products = await _productService.GetSoldProductsBySellerAsync(userId);

            if (products == null || !products.Any())
                return NotFound("No sold products found for this seller.");

            return Ok(products);
        }


        [Authorize]
        [HttpPut("updateProduct/{id}")]
        public async Task<IActionResult> UpdateProduct(long id, [FromBody] ProductUpdateDTO dto)
        {
            var updated = await _productService.UpdateProductAsync(id, dto);
            return Ok(updated);
        }

        [Authorize]
        [HttpGet("GetProductById/{id}")]
        public async Task<IActionResult> GetProductById(long id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            return Ok(product);
        }

        [HttpGet("GetPaymentsForSeller/{sellerId}")]
        public async Task<IActionResult> GetPaymentsForSeller(long sellerId)
        {
            var payments = await _paymentService.GetPaymentsForSellerAsync(sellerId);

            if (payments == null || !payments.Any())
                return NotFound("No payments found for this seller.");

            return Ok(payments);
        }


        [HttpGet("GetProductsByUserId/{userId}")]
        public async Task<IActionResult> GetProductsByUserId(int userId)
        {
            var products = await _productService.GetProductsByUserIdAsync(userId);
            return Ok(products);
        }
    }
}
