using BookEcommerceNET.DTO;
using BookEcommerceNET.Models;
using Microsoft.EntityFrameworkCore;

namespace BookEcommerceNET.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ShopdbContext _context;

        public ProductRepository(ShopdbContext context)
        {
            _context = context;
        }

        public async Task AddProductAsync(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Product>> GetAllProductsAsync()
        {
            return await _context.Products
                .Include(p => p.Category)
                .ToListAsync();
        }



        public async Task<List<Product>> GetProductsByCategoryAsync(long categoryId)
        {
            return await _context.Products
                .Where(p => p.CategoryId == categoryId)
                .ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(long productId)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == productId);
            if (product is null)
                throw new Exception($"Product with ID {productId} not found.");

            return product;
        }


        public async Task<Product> UpdateProductAsync(Product product)
        {
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<List<Product>> GetProductsBySellerIdAsync(long userId)
        {
            return await _context.Products
                .Where(p => p.AddedByUserId == userId)
                .ToListAsync();
        }

        public async Task<List<SoldProductDTO>> GetSoldProductsDetailsBySellerAsync(long sellerId)
        {
            var soldProducts = await (from op in _context.OrderProducts
                                      join p in _context.Products on op.ProductId equals p.ProductId
                                      join o in _context.Orders on op.OrderId equals o.OrderId
                                      join u in _context.Users on o.UserId equals u.Id
                                      where p.AddedByUserId == sellerId
                                      select new SoldProductDTO
                                      {
                                          OrderId = o.OrderId,
                                          OrderDate = o.OrderDate.Value,
                                          CustomerName = u.UserName,
                                          ProductName = p.ProductName,
                                          OrderQuantity = op.Quantity
                                      }).ToListAsync();

            return soldProducts;
        }



        public async Task<List<Product>> GetProductsByUserIdAsync(int userId)
        {
            return await _context.Products
                .Where(p => p.AddedByUserId == userId)
                .ToListAsync();
        }
    }

}
