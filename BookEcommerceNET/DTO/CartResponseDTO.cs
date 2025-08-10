using System.ComponentModel.DataAnnotations;

namespace BookEcommerceNET.DTO
{
    public class CartResponseDTO
    {
        [Required]
        public long CartId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1.")]
        public int? Quantity { get; set; }

        public ProductDTO? Product { get; set; }

        public CartResponseDTO() { }

        public CartResponseDTO(long cartId, int? quantity, ProductDTO? product)
        {
            CartId = cartId;
            Quantity = quantity;
            Product = product;
        }
    }
}
