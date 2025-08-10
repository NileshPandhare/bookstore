using System;

namespace BookEcommerceNET.Models;

public partial class OrderProduct
{
    public long Id { get; set; }

    public int Quantity { get; set; }

    public long? OrderId { get; set; }

    public long? ProductId { get; set; }

    public virtual Order? Order { get; set; }

    public virtual Product? Product { get; set; }
}
