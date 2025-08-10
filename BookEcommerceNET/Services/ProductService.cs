using BookEcommerceNET.DTO;
using BookEcommerceNET.Models;
using BookEcommerceNET.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BookEcommerceNET.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repo;
        private readonly ICategoryRepository _catRepo;

        public ProductService(IProductRepository repo, ICategoryRepository catRepo)
        {
            _repo = repo;
            _catRepo = catRepo;
        }
        public async Task<Product> AddProductAsync(ProductUploadDTO dto)
        {
            byte[]? imageBytes = null;

            if (dto.ProductImage != null && dto.ProductImage.Length > 0)
            {
                using var ms = new MemoryStream();
                await dto.ProductImage.CopyToAsync(ms);
                imageBytes = ms.ToArray();
            }

            var product = new Product
            {
                ProductName = dto.ProductName,
                AddedByUserId = dto.UsertId,
                Price = dto.Price,
                Quantity = dto.Quantity,
                ProductImage = imageBytes,
                CategoryId = dto.CategoryId
            };

            try
            {
                await _repo.AddProductAsync(product);
            }
            catch (Exception dbEx)
            {
                // Optional: log dbEx for debugging
                Console.WriteLine("DB Error: " + dbEx.ToString());
                throw; // rethrow to be caught by controller
            }

            return product;
        }



        private async Task<byte[]> ConvertToBytesAsync(IFormFile file)
        {
            using var ms = new MemoryStream();
            await file.CopyToAsync(ms);
            return ms.ToArray();
        }

        public async Task<List<ProductDTO>> GetAllProductsAsync()
        {
            var products = await _repo.GetAllProductsAsync();
            return products.Select(p => new ProductDTO(p)).ToList();
        }

        public async Task<List<ProductDTO>> GetProductsByCategoryAsync(long categoryId)
        {
            var products = await _repo.GetProductsByCategoryAsync(categoryId);
            return products.Select(p => new ProductDTO(p)).ToList();
        }

        public async Task<Product> GetProductByIdAsync(long productId)
        {
            var product = await _repo.GetProductByIdAsync(productId);
            if (product == null)
                throw new KeyNotFoundException($"Product not found with id: {productId}");

            return product;
        }

        public async Task<Product> UpdateProductAsync(long productId, ProductUpdateDTO dto)
        {
            var product = await _repo.GetProductByIdAsync(productId);
            if (product == null)
                throw new KeyNotFoundException($"Product not found with id: {productId}");

            product.Price = dto.Price;
            product.Quantity = dto.Quantity;

            return await _repo.UpdateProductAsync(product);
        }

        public async Task<List<ProductDTO>> GetProductsBySellerIdAsync(long userId)
        {
            var products = await _repo.GetProductsBySellerIdAsync(userId);

            var productDtos = products.Select(p => new ProductDTO
            {
                ProductId = p.ProductId ?? 0,
                ProductName = p.ProductName,
                Price = p.Price,
                Quantity = p.Quantity,
                ProductImage = p.ProductImage,
                CategoryId = p.CategoryId
            }).ToList();

            return productDtos;
        }

        public async Task<List<SoldProductDTO>> GetSoldProductsBySellerAsync(long userId)
        {
            return await _repo.GetSoldProductsDetailsBySellerAsync(userId);
        }


        public async Task<List<Product>> GetProductsByUserIdAsync(int userId)
        {
            return await _repo.GetProductsByUserIdAsync(userId);
        }
    }

}
