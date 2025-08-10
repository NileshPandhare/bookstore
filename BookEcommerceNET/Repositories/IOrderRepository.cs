using BookEcommerceNET.DTO;
using BookEcommerceNET.Models;

namespace BookEcommerceNET.Repositories
{
    public interface IOrderRepository
    {
        Task<List<AdminOrderDTO>> GetAllOrdersAsync();
        Task<User?> GetUserByIdAsync(long userId);
        Task<Product?> GetProductByIdAsync(long productId);
        Task AddOrderAsync(Order order);
        Task AddOrderProductAsync(OrderProduct orderProduct);
        Task<IEnumerable<Cart>> GetUserCartAsync(long userId);
        void RemoveUserCart(IEnumerable<Cart> carts);
        Task SaveAsync();
        Task<List<OrderDtoResponse>> GetOrdersByUserIdAsync(long userId);
    }
}
