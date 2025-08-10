using BookEcommerceNET.DTO;
using BookEcommerceNET.Models;
using BookEcommerceNET.Repositories;

namespace BookEcommerceNET.Services
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepository;
        private readonly IProductRepository _productRepository;
        private readonly IUserRepository _userRepository;

        public CartService(ICartRepository cartRepository, IProductRepository productRepository, IUserRepository userRepository)
        {
            _cartRepository = cartRepository;
            _productRepository = productRepository;
            _userRepository = userRepository;
        }

        public async Task<CartResponseDTO> AddToCartAsync(CartRequestDTO cartDto)
        {
            var user = await _userRepository.GetUserByIdAsync(cartDto.UserId);
            if (user == null)
                throw new Exception("User not found");

            var product = await _productRepository.GetProductByIdAsync(cartDto.ProductId.Value);
            if (product == null)
                throw new Exception("Product not found");

            var cart = new Cart
            {
                Quantity = cartDto.Quantity,
                UserId = cartDto.UserId,
                ProductId = cartDto.ProductId
            };

            await _cartRepository.AddCartAsync(cart);

            return new CartResponseDTO
            {
                CartId = cart.CartId,
                Quantity = cart.Quantity,
                Product = new ProductDTO
                {
                    ProductId = product.ProductId,
                    ProductName = product.ProductName,
                    Price = product.Price,
                    Quantity = product.Quantity,
                    ProductImage = product.ProductImage
                }
            };
        }

        public async Task<List<CartDTO>> GetCartByUserIdAsync(long userId)
        {
            var carts = await _cartRepository.GetCartByUserIdAsync(userId);

            var cartDTOs = carts.Select(c => new CartDTO
            {
                CartId = c.CartId,
                Quantity = c.Quantity ?? 0,
                UserId = c.UserId,
                Product = new ProductDTO
                {
                    ProductId = c.Product.ProductId,
                    ProductName = c.Product.ProductName,
                    Price = Convert.ToDouble(c.Product.Price),
                    Quantity = Convert.ToDouble(c.Product.Quantity),
                    ProductImage = c.Product.ProductImage
                }
            }).ToList();

            return cartDTOs;
        }


        public async Task RemoveProductFromCartAsync(long userId, long productId)
        {
            var cartItem = await _cartRepository.GetCartItemAsync(userId, productId);
            if (cartItem == null)
                throw new Exception("Product not found in cart");

            await _cartRepository.RemoveCartAsync(cartItem);
        }
    }
}
