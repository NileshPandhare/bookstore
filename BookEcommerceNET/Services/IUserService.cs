using BookEcommerceNET.DTO;
using BookEcommerceNET.Models;

namespace BookEcommerceNET.Services
{
    public interface IUserService
    {
        Task<User> RegisterUserAsync(User user);
        Task<User> UpdateUserAsync(long id, EditUserDTO user);
        Task<List<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(long id);

        Task<User> RegisterSellerAsync(UserDTO userDto);
        
        Task<IEnumerable<User>> GetAllSellersAsync();

        Task<User?> Authenticate(string email, string password);
    }
}
