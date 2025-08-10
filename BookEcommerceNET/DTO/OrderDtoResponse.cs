using BookEcommerceNET.Models;

namespace BookEcommerceNET.DTO
{
    public class OrderDtoResponse
    {
        public long OrderId { get; set; }
        public DateOnly? OrderDate { get; set; }
        public List<OrderItemDTO> OrderItems { get; set; }

    }

}
