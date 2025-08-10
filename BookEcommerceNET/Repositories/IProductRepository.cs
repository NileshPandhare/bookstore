using BookEcommerceNET.DTO;
using BookEcommerceNET.Models;

namespace BookEcommerceNET.Repositories
{
    public interface IProductRepository
    {

        Task AddProductAsync(Product product);

        Task<List<Product>> GetAllProductsAsync();
        Task<List<Product>> GetProductsByCategoryAsync(long categoryId);
        Task<Product> GetProductByIdAsync(long productId);
        Task<Product> UpdateProductAsync(Product product);

        Task<List<Product>> GetProductsBySellerIdAsync(long userId);

        Task<List<SoldProductDTO>> GetSoldProductsDetailsBySellerAsync(long sellerId);
        Task<List<Product>> GetProductsByUserIdAsync(int userId);
    }
}
