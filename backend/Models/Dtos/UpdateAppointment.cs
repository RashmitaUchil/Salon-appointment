using System.ComponentModel.DataAnnotations;
using System;

namespace backend.Models.Dtos

{
	public class UpdateAppointment
	{
        [Required] public int AppointmentId { get; set; }
        [Required] public required bool Status {  get; set; }
    }
}
