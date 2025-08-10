namespace BookEcommerceNET.DTO
{
    public class OrderItemResponseDTO
    {
        public long OrderId { get; set; }
        public DateOnly? OrderDate { get; set; }

        public long ProductId { get; set; }
        public double ProductPrice { get; set; }
        public int Quantity { get; set; }
    }
}
