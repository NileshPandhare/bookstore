using BookEcommerceNET.DTO;
using BookEcommerceNET.Models;
using Microsoft.EntityFrameworkCore;

namespace BookEcommerceNET.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly ShopdbContext _context;

        public PaymentRepository(ShopdbContext context)
        {
            _context = context;
        }

        // Implementation
        public async Task<Payment> AddPaymentAsync(Payment payment)
        {
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
            return payment;
        }

        public async Task<Order> GetOrderByIdAsync(long orderId)
        {
            return await _context.Orders.FindAsync(orderId);
        }

        public async Task<List<AdminPaymentDTO>> GetAllPaymentsAsync()
        {
            return await _context.Payments
                .Include(p => p.Order)                 // Include Order
                .ThenInclude(o => o.User)              // Include User inside Order
                .Select(p => new AdminPaymentDTO
                {
                    PaymentId = p.Id,
                    OrderId = p.OrderId,
                    Amount = p.Amount.Value,
                    PaymentStatus = p.PaymentStatus,
                    UserName = p.Order.User.UserName,     // Adjust based on your property name
                    OrderDate = p.Order.OrderDate         // Adjust based on your property name
                })
                .ToListAsync();
        }



        public async Task<List<SellerPaymentResponseDto>> GetPaymentsForSellerAsync(long sellerId)
        {
            var sellerProductIds = await _context.Products
                .Where(p => p.AddedByUserId == sellerId)
                .Select(p => p.ProductId)
                .ToListAsync();

            var orderIds = await _context.OrderProducts
                .Where(op => sellerProductIds.Contains(op.ProductId))
                .Select(op => op.OrderId)
                .Distinct()
                .ToListAsync();

            var payments = await _context.Payments
                .Where(p => orderIds.Contains(p.OrderId))
                .Select(p => new SellerPaymentResponseDto
                {
                    Id = p.Id,
                    Amount = p.Amount.Value,
                    PaymentStatus = p.PaymentStatus,
                    OrderId = p.OrderId
                })
                .ToListAsync();

            return payments;
        }


    }

}
