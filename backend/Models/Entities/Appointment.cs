using System.ComponentModel.DataAnnotations;

namespace backend.Models.Entities
{
    public class Appointment
    {
        [Required] public int AppointmentId { get; set; }
        [Required] public int UserId { get; set; }
        [Required] public DateTime AppointmentDate { get; set; }
        [Required] public TimeSpan AppointmentTime { get; set; }
        [Required] public string Service { get; set; }
        public string? AdditionalNotes { get; set; }

        public virtual User User { get; set; }
    }
}