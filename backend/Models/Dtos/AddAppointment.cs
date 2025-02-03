using System.ComponentModel.DataAnnotations;

namespace backend.Models.Dtos
{
    public class AddAppointment
    {
        [Required]
        public required int UserId { get; set; }

        [Required]
        public required DateTime AppointmentDate { get; set; }

        [Required]
        public required TimeSpan AppointmentTime { get; set; }

        [Required]
        public required string Service { get; set; }

        public string? AdditionalNotes { get; set; }

        public required bool Status { get; set; }
    }
}