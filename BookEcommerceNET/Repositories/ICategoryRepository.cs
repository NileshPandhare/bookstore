using BookEcommerceNET.Models;

namespace BookEcommerceNET.Repositories
{
    public interface ICategoryRepository
    {
        Task AddCategoryAsync(Category category);
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
    }
}
