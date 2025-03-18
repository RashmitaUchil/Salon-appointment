using System.Net;
using AutoMapper;
using Azure;
using backend.Data;
using backend.IServices;
using backend.Models.Dtos;
using backend.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentServices appointmentServices;
        public AppointmentController(IAppointmentServices appointmentServices)
        {
            this.appointmentServices = appointmentServices ?? throw new ArgumentNullException(nameof(appointmentServices));
        }

        [HttpPost("book")]
        public async Task<IActionResult> AddAppointment([FromBody] AddAppointment request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (response, statusCode) = await appointmentServices.addAppointment(request);
            return StatusCode(statusCode, response);
        }



        [HttpGet]
        public async Task<IActionResult> GetUserAppointments([FromQuery] int userId)
        {
            var (response, statusCode) = await appointmentServices.getUserAppointments(userId);
            return StatusCode(statusCode, response);


        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAppointment([FromQuery] int appointmentId)
        {
            var (response, statusCode) = await appointmentServices.deleteAppointment(appointmentId);
            return StatusCode(statusCode, response);
        }


        [HttpPut("update")]
        public async Task<IActionResult> UpdateAppointment([FromBody] UpdateAppointment update)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var (response, statusCode) = await appointmentServices.updateAppointment(update);
            return StatusCode(statusCode, response);

        }


        [HttpGet("dashboard")]
        public async Task<IActionResult> GetAllAppointments()
        {

            var (response, statusCode) = await appointmentServices.getAllAppointments();
            return StatusCode(statusCode, response);
        }

        [HttpPut("action")]
        public async Task<IActionResult> PutAppointmentAction([FromBody] AppointmentAction appointmentAction)
        {
            var (response, statusCode) = await appointmentServices.putAppointmentAction(appointmentAction);
            return StatusCode(statusCode, response);
        }



    }
}