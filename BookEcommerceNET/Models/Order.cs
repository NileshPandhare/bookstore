using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookEcommerceNET.Models;

public partial class Order
{
    [Key]
    public long OrderId { get; set; }

   
    public DateOnly? OrderDate { get; set; }

    [ForeignKey("User")]
    public long? UserId { get; set; }

    
    public virtual ICollection<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();

   
    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    
    public virtual User? User { get; set; }
}
