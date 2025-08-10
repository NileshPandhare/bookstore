using BookEcommerceNET.Models;

namespace BookEcommerceNET.DTO
{
    public class ProductDTO
    {
        public long? ProductId { get; set; }
        public string? ProductName { get; set; }
        public double Price { get; set; }
        public double Quantity { get; set; }
        public byte[]? ProductImage { get; set; }
        public long? CategoryId { get; set; }

        public string? CategoryName { get; set; }

        public ProductDTO() { }
        public ProductDTO(Product product)
        {
            ProductId = product.ProductId;
            ProductName = product.ProductName;
            Price = product.Price;
            Quantity = product.Quantity;
            ProductImage = product.ProductImage;
            CategoryId = product.CategoryId;
            CategoryName = product.Category?.Name;
        }
    }
}
