using System.ComponentModel.DataAnnotations;

namespace BookEcommerceNET.DTO
{
    public class CartRequestDTO
    {
       
        public int? Quantity { get; set; }

      
        public long? ProductId { get; set; }

       
        public long UserId { get; set; }

        public CartRequestDTO() { }

        public CartRequestDTO(int? quantity, long? productId, long userId)
        {
            Quantity = quantity;
            ProductId = productId;
            UserId = userId;
        }
    }
}
