using BookEcommerceNET.DTO;
using BookEcommerceNET.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookEcommerceNET.Controllers
{
    [Route("admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IProductService _productService;
        private readonly IOrderService _orderService;
        private readonly IPaymentService _paymentService;
        private readonly IUserService _userService;

        public AdminController(ICategoryService categoryService, IProductService productService,
                               IOrderService orderService, IPaymentService paymentService, IUserService userService)
        {
            _categoryService = categoryService;
            _productService = productService;
            _orderService = orderService;
            _paymentService = paymentService;
            _userService = userService;
        }

        [Authorize]
        [HttpPost("addCategory")]
        public async Task<IActionResult> AddCategory([FromForm] string name, [FromForm] IFormFile image)
        {
            var result = await _categoryService.AddCategoryAsync(name, image);
            return Created("", result);
        }

        [AllowAnonymous]
        [HttpGet("getAllCategories")]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _categoryService.GetAllCategoriesAsync();
            return Ok(categories);
        }



        [AllowAnonymous]
        [HttpGet("getProductsByCategory/{id}")]
        public async Task<ActionResult<List<ProductDTO>>> GetProductsByCategory(long id)
        {
            var products = await _productService.GetProductsByCategoryAsync(id);
            return Ok(products);
        }

        [Authorize]
        [HttpGet("getAllProducts")]
        public async Task<ActionResult<List<ProductDTO>>> GetAllProducts()
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }

        [Authorize]
        [HttpGet("getAllOrders")]
        public async Task<IActionResult> GetAllOrders()
        {
            try
            {
                var orders = await _orderService.GetAllOrdersAsync();
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [Authorize]
        [HttpGet("getAllPayments")]
        public async Task<ActionResult<List<AdminPaymentDTO>>> GetAllPayments()
        {
            try
            {
                var payments = await _paymentService.GetAllPaymentsAsync(); // Use appropriate service
                return Ok(payments);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [Authorize]
        [HttpPut("updateProduct/{id}")]
        public async Task<IActionResult> UpdateProduct(long id, [FromBody] ProductUpdateDTO dto)
        {
            var updated = await _productService.UpdateProductAsync(id, dto);
            return Ok(updated);
        }

        [Authorize]
        [HttpGet("product/{id}")]
        public async Task<IActionResult> GetProductById(long id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            return Ok(product);
        }

        [Authorize]
        [HttpPost("registerSeller")]
        public async Task<IActionResult> RegisterSeller([FromBody] UserDTO dto)
        {
            try
            {
                var newEngineer = await _userService.RegisterSellerAsync(dto);
                return Created("", newEngineer);
            }
            catch (Exception)
            {
                return StatusCode(500, "Error registering seller");
            }
        }

        [Authorize]
        [HttpPut("updateUser/{id}")]
        public async Task<IActionResult> UpdateUser(long id, [FromBody] EditUserDTO dto)
        {
            try
            {
                var updated = await _userService.UpdateUserAsync(id, dto);
                return Ok(updated);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("getAllSellers")]
        public async Task<IActionResult> GetAllSellers()
        {
            try
            {
                var engineers = await _userService.GetAllSellersAsync();
                return Ok(engineers);
            }
            catch (Exception)
            {
                return StatusCode(500, "Error fetching users by role");
            }
        }

    }

}
