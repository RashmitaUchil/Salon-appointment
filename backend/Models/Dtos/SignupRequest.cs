using System.ComponentModel.DataAnnotations;
namespace backend.Models.Dtos
{
    public class SignupRequest
    {
        [Required]
        public required string Name { get; set; }
        [Required]
        public required string Email { get; set; }
        [Required]
        public required string Password { get; set; }
        public string? Phone { get; set; }
    }
}