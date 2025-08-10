using BookEcommerceNET.DTO;
using BookEcommerceNET.Models;
using BookEcommerceNET.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BookEcommerceNET.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;

        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task<List<AdminOrderDTO>> GetAllOrdersAsync()
        {
            return (List<AdminOrderDTO>)await _orderRepository.GetAllOrdersAsync();
        }

        public async Task<OrderDTO> CreateOrderAsync(CreateOrderRequest request)
        {
            var user = await _orderRepository.GetUserByIdAsync(request.Id)
                       ?? throw new Exception("User not found");

            var order = new Order
            {
                User = user,
                OrderDate = DateOnly.FromDateTime(DateTime.Now)

            };

            await _orderRepository.AddOrderAsync(order);
            await _orderRepository.SaveAsync();

            foreach (var item in request.Items)
            {
                var product = await _orderRepository.GetProductByIdAsync(item.ProductId)
                              ?? throw new Exception("Product not found");

                if (product.Quantity < item.Quantity)
                    throw new Exception($"Insufficient stock for {product.ProductName}");

                product.Quantity -= item.Quantity;

                var orderProduct = new OrderProduct
                {
                    OrderId = order.OrderId,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity
                };

                await _orderRepository.AddOrderProductAsync(orderProduct);
            }

            var userCart = await _orderRepository.GetUserCartAsync(user.Id);
            _orderRepository.RemoveUserCart(userCart);

            await _orderRepository.SaveAsync();

            return new OrderDTO(order);
        }

        public async Task<List<OrderDtoResponse>> GetOrdersByUserIdAsync(long userId)
        {
            return await _orderRepository.GetOrdersByUserIdAsync(userId);
        }
    }

}
