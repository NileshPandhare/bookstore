using System;

namespace BookEcommerceNET.Models
{
    public partial class Payment
    {
        public long Id { get; set; }

       
        public double? Amount { get; set; }

        
        public string? PaymentMode { get; set; }

       
        public string? PaymentStatus { get; set; }

       
        public long OrderId { get; set; }

      
        public virtual Order Order { get; set; } = null!;
    }
}
