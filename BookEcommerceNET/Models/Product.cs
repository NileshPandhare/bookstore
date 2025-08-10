using System;
using System.Collections.Generic;

namespace BookEcommerceNET.Models
{
    public partial class Product
    {
        public long? ProductId { get; set; }

        public double Price { get; set; }

        public byte[]? ProductImage { get; set; }

        public string? ProductName { get; set; }

        public double Quantity { get; set; }

        public long? AddedByUserId { get; set; }

        public long? CategoryId { get; set; }

        public virtual User? AddedByUser { get; set; }

        public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

        public virtual Category? Category { get; set; }

        public virtual ICollection<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();
    }
}
