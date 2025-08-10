using System.ComponentModel.DataAnnotations;

namespace BookEcommerceNET.DTO
{
    public class CategoryDTO
    {
        [Required]
        public long CategoryId { get; set; }

        [Required(ErrorMessage = "Category name is required.")]
        [StringLength(100, ErrorMessage = "Name can't be longer than 100 characters.")]
        public string Name { get; set; } = string.Empty;

        public byte[]? Image { get; set; }

        public CategoryDTO() { }

        public CategoryDTO(long categoryId, string name, byte[]? image = null)
        {
            CategoryId = categoryId;
            Name = name;
            Image = image;
        }
    }
}
