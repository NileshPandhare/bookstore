namespace BookEcommerceNET.DTO
{
    public class SellerPaymentResponseDto
    {
        public long Id { get; set; }
        public double Amount { get; set; }
        public string PaymentStatus { get; set; }
        public long OrderId { get; set; }
    }
}
