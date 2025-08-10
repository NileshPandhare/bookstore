using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookEcommerceNET.Models;

public partial class Category
{
    [Key]
    public long Id { get; set; }

    public byte[]? Image { get; set; }

    public string? Name { get; set; }

    
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
