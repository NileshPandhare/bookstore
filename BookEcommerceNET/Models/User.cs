using System.Collections.Generic;

namespace BookEcommerceNET.Models
{
    public partial class User
    {
        public long Id { get; set; }

        public string? UserName { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }

        public string? Contact { get; set; }

        public string? Address { get; set; }

        public string? Pincode { get; set; }

        public string? Role { get; set; }  

       
        public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

        public virtual ICollection<Product> Products { get; set; } = new List<Product>(); // If users can add products
    }
}
