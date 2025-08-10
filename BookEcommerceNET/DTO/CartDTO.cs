using System.ComponentModel.DataAnnotations;

namespace BookEcommerceNET.DTO
{
    public class CartDTO
    {
        [Required]
        public long CartId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1.")]
        public int? Quantity { get; set; }

        [Required(ErrorMessage = "ProductId is required.")]
        public long? ProductId { get; set; }

        [Required(ErrorMessage = "UserId is required.")]
        public long UserId { get; set; }

        public ProductDTO? Product { get; set; }

        public CartDTO() { }

        public CartDTO(long cartId, int? quantity, long? productId, long userId, ProductDTO? product)
        {
            CartId = cartId;
            Quantity = quantity;
            ProductId = productId;
            UserId = userId;
            Product = product;
        }
    }
}
