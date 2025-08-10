using BookEcommerceNET.DTO;
using BookEcommerceNET.Models;

namespace BookEcommerceNET.Services
{
    public interface IProductService
    {
        Task<Product> AddProductAsync(ProductUploadDTO dto);
        Task<List<ProductDTO>> GetProductsByCategoryAsync(long categoryId);

        Task<List<ProductDTO>> GetAllProductsAsync();

        Task<Product> GetProductByIdAsync(long productId);
        Task<Product> UpdateProductAsync(long productId, ProductUpdateDTO dto);

        Task<List<ProductDTO>> GetProductsBySellerIdAsync(long userId);

        //Task<List<Product>> GetSoldProductsBySellerAsync(long userId);

        Task<List<Product>> GetProductsByUserIdAsync(int userId);

        Task<List<SoldProductDTO>> GetSoldProductsBySellerAsync(long userId);
    }


}
