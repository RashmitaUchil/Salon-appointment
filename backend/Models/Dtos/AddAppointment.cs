using System.ComponentModel.DataAnnotations;

namespace backend.Models.Dtos
{
    public class AddAppointment
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public DateTime AppointmentDate { get; set; }

        [Required]
        public TimeSpan AppointmentTime { get; set; }

        [Required]
        public string Service { get; set; }

        public string? AdditionalNotes { get; set; }
    }
}