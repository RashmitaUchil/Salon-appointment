using backend.Data;
using backend.Models.Dtos;
using backend.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public AppointmentController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext)); ;
        }

        [HttpPost]
        public async Task<IActionResult> AddAppointment([FromBody] AddAppointment request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var app = new Appointment()
            {
                UserId = request.UserId,
                AppointmentDate = request.AppointmentDate,
                AppointmentTime = request.AppointmentTime,
                Service = request.Service,
                AdditionalNotes = request.AdditionalNotes,
                Status = request.Status
            };

            try
            {
                dbContext.Appointments.Add(app);
                await dbContext.SaveChangesAsync();
                return Ok(new { AppointmentId = app.AppointmentId });
            }
            catch (Exception ex)
            {

                return StatusCode(500, new { meassage = "An error occurred while adding the appointment. Please try again.", error = ex.Message });
            }
        }


        [HttpGet]
        public async Task<IActionResult> GetUserAppointments([FromQuery] int userId)
        {
            var appointments = await dbContext.Appointments
                .Where(a => a.UserId == userId)
                .Select(a => new
                {
                    a.AppointmentId,
                    a.AppointmentDate,
                    a.AppointmentTime,
                    a.Service,
                    a.AdditionalNotes,
                    a.Status
                })
                .OrderByDescending(a => a.AppointmentDate)
                .ThenByDescending(a => a.AppointmentTime)
                .ToListAsync(); 

            if (!appointments.Any())
            {
                return NotFound(new { message = "No appointments found for this user" });
            }

            return Ok(appointments);
        }


        [HttpDelete]
        public async Task<IActionResult> DeleteAppointment([FromQuery] int appointmentId)
        {
            try
            {
                var appointment = await dbContext.Appointments.FirstOrDefaultAsync(a => a.AppointmentId == appointmentId);

                if (appointment == null)
                {
                    return NotFound(new { message = "Appointment not found" });
                }

                dbContext.Appointments.Remove(appointment);
                await dbContext.SaveChangesAsync();

                return Ok(new { message = "Appointment deleted successfully" });
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }


        [HttpPut]
        public async Task<IActionResult> UpdateAppointment([FromBody] UpdateAppointment update)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                var app = await dbContext.Appointments.FirstOrDefaultAsync(a => a.AppointmentId == update.AppointmentId);

                if (app == null)
                {
                    return NotFound(new { message = "Appointment not found" });
                }

                
                app.Status = update.Status; 

                await dbContext.SaveChangesAsync();

                return Ok(new { message = "Appointment updated successfully", appointment = app });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

    }
}