using BookEcommerceNET.DTO;
using BookEcommerceNET.Models;
using Microsoft.EntityFrameworkCore;

namespace BookEcommerceNET.Repositories
{
    public class CartRepository : ICartRepository
    {
        private readonly ShopdbContext _context;

        public CartRepository(ShopdbContext context)
        {
            _context = context;
        }

        public async Task AddCartAsync(Cart cart)
        {
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Cart>> GetCartByUserIdAsync(long userId)
        {
            return await _context.Carts
                .Include(c => c.Product)
                .Include(c => c.User)
                .Where(c => c.User.Id == userId)
                .ToListAsync();
        }


        public async Task<Cart?> GetCartItemAsync(long userId, long productId)
        {
            return await _context.Carts
                .FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == productId);
        }

        public async Task RemoveCartAsync(Cart cart)
        {
            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();
        }

    }
}
