using BookEcommerceNET.Models;

namespace BookEcommerceNET.DTO
{
    public class OrderDTO
    {
        public long OrderId { get; set; }
        public long UserId { get; set; }
        public DateOnly OrderDate { get; set; }
        public List<OrderItemDTO> Items { get; set; } = new();

        public OrderDTO(Order order)
        {
            OrderId = order.OrderId;
            UserId = order.UserId ?? 0;

            // Convert DateTime? to DateOnly safely
            OrderDate = order.OrderDate.Value;

            Items = order.OrderProducts?.Select(op => new OrderItemDTO
            {
                ProductId = op.ProductId,  
                Quantity = op.Quantity
            }).ToList() ?? new List<OrderItemDTO>();
        }
    }
}
