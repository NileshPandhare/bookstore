using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookEcommerceNET.Models;

public partial class Cart
{
    [Key]
    public long CartId { get; set; }

    public int? Quantity { get; set; }

    [ForeignKey("Product")]
    public long? ProductId { get; set; }

    [ForeignKey("User")]
    public long UserId { get; set; }

    public virtual Product? Product { get; set; }

    public virtual User User { get; set; } = null!;
}
