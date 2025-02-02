using backend.Data;
using backend.Models.Dtos;
using backend.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public AppointmentController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddAppointment([FromBody] AddAppointment request)
        {
            var app = new Appointment()
            {
                UserId = request.UserId,
                AppointmentDate = request.AppointmentDate,
                AppointmentTime = request.AppointmentTime,
                Service = request.Service,
                AdditionalNotes = request.AdditionalNotes
            };

            dbContext.Appointments.Add(app);
            await dbContext.SaveChangesAsync();
            return Ok(app.AppointmentId);
        }

        [HttpGet("user/{UserId}")]
        public IActionResult GetUserAppointments(int userId)
        {
            var currentDateTime = DateTime.Now; // Get current date and time
            var appointments = dbContext.Appointments
                .Where(a => a.UserId == userId)
                .Select(a => new
                {
                    a.AppointmentId,
                    a.AppointmentDate,
                    a.AppointmentTime,
                    a.Service,
                    a.AdditionalNotes,
                    Status = (a.AppointmentDate.Date < currentDateTime.Date ||
                             (a.AppointmentDate.Date == currentDateTime.Date &&
                              (a.AppointmentTime) < currentDateTime.TimeOfDay))
                            ? "Completed"
                            : "Upcoming"
                })
                .OrderByDescending(a => a.AppointmentDate)
                .ThenByDescending(a => a.AppointmentTime)
                .ToList();

            if (!appointments.Any())
            {
                return NotFound(new { message = "No appointments found for this user" });
            }
            return Ok(appointments);
        }

        [HttpDelete("{appointmentId}")]
        public IActionResult DeleteAppointment(int appointmentId)
        {
            var appointment = dbContext.Appointments.Find(appointmentId);

            if (appointment == null)
            {
                return NotFound(new { message = "Appointment not found" });
            }

            dbContext.Appointments.Remove(appointment);
            dbContext.SaveChanges();

            return Ok(new { message = "Appointment deleted successfully" });
        }
    }
}