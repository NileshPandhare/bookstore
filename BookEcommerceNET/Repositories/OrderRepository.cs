using BookEcommerceNET.DTO;
using BookEcommerceNET.Models;
using Microsoft.EntityFrameworkCore;

namespace BookEcommerceNET.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ShopdbContext _context;

        public OrderRepository(ShopdbContext context)
        {
            _context = context;
        }

        public async Task<List<AdminOrderDTO>> GetAllOrdersAsync()
        {
            var orderProducts = await _context.OrderProducts
                .Include(op => op.Order)
                    .ThenInclude(o => o.User)
                .Include(op => op.Product)
                .ToListAsync();

            var result = new List<AdminOrderDTO>();

            foreach (var op in orderProducts)
            {
                if (op == null || op.Order == null || op.Product == null || !op.Order.OrderDate.HasValue || op.Order.User == null)
                    continue;

                var order = op.Order;
                var product = op.Product;
                var userName = order.User?.UserName ?? "Unknown";
                var orderDate = order.OrderDate.Value; 

                result.Add(new AdminOrderDTO(
                    order.OrderId,
                    orderDate,
                    userName,
                    product.ProductName ?? "Unknown",
                    op.Quantity
                ));
            }

            return result;
        }

        public async Task<User?> GetUserByIdAsync(long userId)
        => await _context.Users.FindAsync(userId);

        public async Task<Product?> GetProductByIdAsync(long productId)
            => await _context.Products.FindAsync(productId);

        public async Task AddOrderAsync(Order order)
            => await _context.Orders.AddAsync(order);

        public async Task AddOrderProductAsync(OrderProduct orderProduct)
            => await _context.OrderProducts.AddAsync(orderProduct);

        public async Task<IEnumerable<Cart>> GetUserCartAsync(long userId)
            => await _context.Carts.Where(c => c.UserId == userId).ToListAsync();

        public void RemoveUserCart(IEnumerable<Cart> carts)
            => _context.Carts.RemoveRange(carts);

        public async Task SaveAsync()
            => await _context.SaveChangesAsync();

        public async Task<List<OrderDtoResponse>> GetOrdersByUserIdAsync(long userId)
        {
            var orders = await _context.Orders
                .Where(o => o.UserId == userId)
                .Include(o => o.OrderProducts)
                    .ThenInclude(oi => oi.Product)
                .ToListAsync();

            return orders.Select(order => new OrderDtoResponse
            {
                OrderId = order.OrderId,
                OrderDate = order.OrderDate,
                OrderItems = order.OrderProducts.Select(item => new OrderItemDTO
                {
                    OrderId = order.OrderId,
                    OrderDate = order.OrderDate,
                    ProductName = item.Product.ProductName,
                    ProductImage = Convert.ToBase64String(item.Product.ProductImage),
                    ProductPrice = Convert.ToDecimal(item.Product.Price),
                    Quantity = item.Quantity
                }).ToList()
            }).ToList();
        }

    }
}
