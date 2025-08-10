using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BookEcommerceNET.DTO
{
    public class CreateOrderRequest
    {
       // [Required(ErrorMessage = "User ID is required.")]
        public long Id { get; set; } // User ID

        [Required(ErrorMessage = "Order items are required.")]
       // [MinLength(1, ErrorMessage = "At least one order item must be provided.")]
        public List<OrderItemResponseDTO> Items { get; set; } = new();
    }
}
