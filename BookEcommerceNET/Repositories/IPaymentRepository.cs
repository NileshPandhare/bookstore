using BookEcommerceNET.DTO;
using BookEcommerceNET.Models;

namespace BookEcommerceNET.Repositories
{
    public interface IPaymentRepository
    {
        Task<Payment> AddPaymentAsync(Payment payment);
        Task<Order> GetOrderByIdAsync(long orderId);
        Task<List<AdminPaymentDTO>> GetAllPaymentsAsync();
        Task<List<SellerPaymentResponseDto>> GetPaymentsForSellerAsync(long sellerId);
    }
}
