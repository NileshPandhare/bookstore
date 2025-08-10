namespace BookEcommerceNET.DTO
{
    public class AdminPaymentDTO
    {
        public long PaymentId { get; set; }
        public long OrderId { get; set; }
        public DateOnly? OrderDate { get; set; }
        public string? UserName { get; set; }
        public string? PaymentStatus { get; set; }
        public double Amount { get; set; }

        public AdminPaymentDTO() { } // Add this

        public AdminPaymentDTO(long paymentId, long orderId, DateOnly? orderDate, string? userName, string? paymentStatus, double amount)
        {
            PaymentId = paymentId;
            OrderId = orderId;
            OrderDate = orderDate;
            UserName = userName;
            PaymentStatus = paymentStatus;
            Amount = amount;
        }

    }
}
