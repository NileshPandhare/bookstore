using BookEcommerceNET.DTO;
using BookEcommerceNET.Models;

namespace BookEcommerceNET.Services
{
    public interface IPaymentService
    {
        Task<PaymentResponseDTO> ProcessPaymentAsync(PaymentRequestDTO request);
        Task<List<PaymentResponseDTO>> GetAllPaymentsAsync();
        Task<List<SellerPaymentResponseDto>> GetPaymentsForSellerAsync(long sellerId);
    }
}
