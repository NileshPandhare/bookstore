namespace BookEcommerceNET.DTO
{
    public class AdminOrderDTO
    {

        public long OrderId { get; set; }
        public DateOnly? OrderDate { get; set; }
        public string? UserName { get; set; }
        public string? ProductName { get; set; }
        public int Quantity { get; set; }

        public AdminOrderDTO(long orderId, DateOnly? orderDate, string? userName, string? productName, int quantity)
        {
            OrderId = orderId;
            OrderDate = orderDate;
            UserName = userName;
            ProductName = productName;
            Quantity = quantity;
        }
    }
}
