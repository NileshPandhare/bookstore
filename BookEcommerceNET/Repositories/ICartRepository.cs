using BookEcommerceNET.DTO;
using BookEcommerceNET.Models;
using System.Threading.Tasks;

namespace BookEcommerceNET.Repositories
{
    public interface ICartRepository
    {
        Task AddCartAsync(Cart cart);
        Task<List<Cart>> GetCartByUserIdAsync(long userId);
        Task<Cart?> GetCartItemAsync(long userId, long productId);
        Task RemoveCartAsync(Cart cart);
    }
}
