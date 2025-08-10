using System.ComponentModel.DataAnnotations;

namespace BookEcommerceNET.DTO
{
    public class LoginDTO
    {
       
        public string Email { get; set; } = null!;

        
        public string Password { get; set; } = null!;
    }
}
