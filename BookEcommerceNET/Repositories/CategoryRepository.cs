using BookEcommerceNET.Models;
using Microsoft.EntityFrameworkCore;

namespace BookEcommerceNET.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ShopdbContext _context;

        public CategoryRepository(ShopdbContext context)
        {
            _context = context;
        }

        public async Task AddCategoryAsync(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
        {
            return await _context.Categories.ToListAsync();
        }
    }

}
