
using BookEcommerceNET.DTO;
using System.Threading.Tasks;

namespace BookEcommerceNET.Services
{
    public interface ICategoryService
    {
        Task<CategoryDTO> AddCategoryAsync(string name, IFormFile? image);
        Task<IEnumerable<CategoryDTO>> GetAllCategoriesAsync();
    }
}
