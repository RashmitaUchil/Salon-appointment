using AutoMapper;
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
        private readonly IMapper mapper;

        public AppointmentController(ApplicationDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext)); ;
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpPost("book")]
        public async Task<IActionResult> AddAppointment([FromBody] AddAppointment request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var app = mapper.Map<Appointment>(request);


            try
            {
                dbContext.Appointments.Add(app);
                await dbContext.SaveChangesAsync();
                return Ok(new { message = "Appointment booked successfully" });
            }
            catch (Exception ex)
            {

                return StatusCode(500, new { message = "An error occurred while adding the appointment. Please try again.", error = ex.Message });
            }
        }



        [HttpGet]
        public async Task<IActionResult> GetUserAppointments([FromQuery] int userId)
        {
            try
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
                    a.Status,
                    a.UserId,
                    a.Action
                })
                .OrderByDescending(a => a.AppointmentDate)
                .ThenByDescending(a => a.AppointmentTime)
                .ToListAsync();

                if (appointments == null || appointments.Count == 0)
                {
                    return NotFound(new { message = "No apppointments found" });
                }

                return Ok(appointments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to fetch the appointments", error = ex.Message });
            }


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


        [HttpPut("update")]
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


                mapper.Map(update, app);

                await dbContext.SaveChangesAsync();

                return Ok(new { message = "Appointment updated successfully", appointment = app });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }


        [HttpGet("dashboard")]
        public async Task<IActionResult> GetCompletedAppointment()
        {
            try
            {

                var appointmentsWithUsers = await dbContext.Appointments
                    .Include(appointment => appointment.User)
                    .Select(appointment => new
                    {
                        appointment.AppointmentId,
                        appointment.Service,
                        appointment.AppointmentDate,
                        appointment.AppointmentTime,
                        appointment.AdditionalNotes,
                        appointment.Status,
                        Name = appointment.User.Name,
                        Id = appointment.User.Id,
                        appointment.Action
                    })
                    .OrderBy(a => a.AppointmentDate)
                    .ThenBy(a => a.AppointmentTime)
                    .ToListAsync();

                if (appointmentsWithUsers == null)
                {
                    return NotFound(new { message = "No appointments" });
                }

                return Ok(appointmentsWithUsers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to fetch the appointments", error = ex.Message });
            }
        }

        [HttpPut("action")]
        public async Task<IActionResult> PutAppointmentAction([FromBody] AppointmentAction appointmentAction)
        {
            try
            {
                var app = await dbContext.Appointments.FirstOrDefaultAsync(a => a.AppointmentId == appointmentAction.AppointmentId);

                if (app == null)
                {
                    return NotFound(new { message = "Appointment not found" });
                }
                mapper.Map(appointmentAction, app);

                await dbContext.SaveChangesAsync();

                return Ok(new
                {
                    message = appointmentAction.Action ? "Appointment accepted!" : "Appointment rejected!",
                    appointment = app
                });


            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }



    }
}