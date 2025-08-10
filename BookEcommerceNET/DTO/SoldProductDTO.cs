namespace BookEcommerceNET.DTO
{
    public class SoldProductDTO
    {

        public long OrderId { get; set; }
        public DateOnly OrderDate { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string ProductName { get; set; } = string.Empty;
        public int OrderQuantity { get; set; }
    }
}
