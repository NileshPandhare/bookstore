using BookEcommerceNET.DTO;

namespace BookEcommerceNET.Services
{
    public interface IOrderService
    {
        Task<List<AdminOrderDTO>> GetAllOrdersAsync();
        Task<OrderDTO> CreateOrderAsync(CreateOrderRequest request);
        Task<List<OrderDtoResponse>> GetOrdersByUserIdAsync(long userId);
    }
}
