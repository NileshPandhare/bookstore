using BookEcommerceNET.DTO;
using BookEcommerceNET.Models;
using BookEcommerceNET.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BookEcommerceNET.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher<User> _passwordHasher;

        public UserService(IUserRepository userRepository, IPasswordHasher<User> passwordHasher)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
        }

        public async Task<User> RegisterUserAsync(User user)
        {
            user.Role = Role.ROLE_CUSTOMER.ToString();
            user.Password = _passwordHasher.HashPassword(user, user.Password);

            return await _userRepository.RegisterUserAsync(user);
        }

        public async Task<User> UpdateUserAsync(long id, User user)
        {
            user.Password = _passwordHasher.HashPassword(user, user.Password);
            return await _userRepository.UpdateUserAsync(id, user);
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _userRepository.GetAllUsersAsync();
        }

        public async Task<User> GetUserByIdAsync(long id)
        {
            return await _userRepository.GetUserByIdAsync(id);
        }

        public async Task<User> RegisterSellerAsync(UserDTO userDto)
        {
            var user = new User
            {
                UserName = userDto.UserName,
                Email = userDto.Email,
                Contact = userDto.Contact,
                Pincode = userDto.Pincode,
                Address = userDto.Address,
                Role = Role.ROLE_SELLER.ToString()
            };

            user.Password = _passwordHasher.HashPassword(user, userDto.Password);
            return await _userRepository.RegisterUserAsync(user);
        }

        public async Task<User> UpdateUserAsync(long id, EditUserDTO userDto)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            if (user == null)
                throw new Exception($"User with id {id} not found.");

            user.UserName = userDto.UserName;
            user.Email = userDto.Email;
            user.Contact = userDto.Contact;
            user.Pincode = userDto.Pincode;
            user.Address = userDto.Address;

            return await _userRepository.UpdateUserAsync(id, user);
        }

        public async Task<IEnumerable<User>> GetAllSellersAsync()
        {
            return await _userRepository.GetUsersByRoleAsync(Role.ROLE_SELLER.ToString());
        }

        public async Task<User?> Authenticate(string email, string password)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null )
            {
                    return null; 

            }

            Console.WriteLine($"Email: {email}");
            Console.WriteLine($"User from DB: {user?.Email}");
            Console.WriteLine($"Stored Hash: {user?.Password}");
            Console.WriteLine($"Entered password: {password}");

            var result = _passwordHasher.VerifyHashedPassword(user, user.Password, password);
            Console.WriteLine($"Verify result: {result}");

            return result == PasswordVerificationResult.Success ? user : null;
        }
    }
}
