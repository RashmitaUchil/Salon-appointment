using System.ComponentModel.DataAnnotations;

namespace backend.Models.Entities
{
    public class Appointment
    {
        [Required] public int AppointmentId { get; set; }
        [Required] public required int UserId { get; set; }
        [Required] public required DateTime AppointmentDate { get; set; }
        [Required] public required TimeSpan AppointmentTime { get; set; }
        [Required] public required string Service { get; set; }
        public string? AdditionalNotes { get; set; }
        [Required] public required bool Status { get; set; }
        public bool? Action { get; set; }

        public virtual User? User { get; set; }
    }
}