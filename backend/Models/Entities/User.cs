using System.ComponentModel.DataAnnotations;

namespace backend.Models.Entities
{
    public class User
    {
        [Required] public int Id { get; set; }
        [Required] public required string Name { get; set; }
        [Required] public required string Email { get; set; }
        [Required] public required string Password { get; set; }
        [Required] public string? Phone { get; set; }

        public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
    }
}