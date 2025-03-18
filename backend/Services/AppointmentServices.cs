using System.Net;
using AutoMapper;
using Azure.Core;
using backend.Data;
using backend.Data.IRepository;
using backend.IServices;
using backend.Models.Dtos;
using backend.Models.Entities;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

public class AppointmentServices : IAppointmentServices
{
    private readonly ApplicationDbContext dbContext;
    private readonly IMapper mapper;

    private readonly IAppointmentRepository appointmentRepository;

    public AppointmentServices(ApplicationDbContext dbContext, IMapper mapper, IAppointmentRepository appointmentRepository)
    {
        this.dbContext = dbContext ?? throw new ArgumentOutOfRangeException(nameof(dbContext));
        this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        this.appointmentRepository = appointmentRepository ?? throw new ArgumentNullException(nameof(appointmentRepository));
    }

    public async Task<(object response, int statusCode)> addAppointment(AddAppointment request)
    {
        if (request.UserId == 0)
        {
            return (new { message = "Login to Book" }, (int)HttpStatusCode.BadRequest);
        }
        var appointment = mapper.Map<Appointment>(request);

        try
        {
            await appointmentRepository.AddAppointment(appointment);
            return (new { message = "Appointment booked successfully" }, (int)HttpStatusCode.OK);
        }
        catch (Exception ex)
        {
            return (new { message = "Failed to book" }, GetStatusCodeFromException(ex));
        }
    }

    public async Task<(object response, int statusCode)> getUserAppointments(int userId)
    {
        try
        {
            var appointments = await appointmentRepository.GetAppointmentByUserId(userId);

            if (appointments == null || !appointments.Any())
            {
                return (new { message = "No apppointments found" }, (int)HttpStatusCode.NotFound);
            }
            var FormattedAppointments = appointments
                            .Select(a => new
                            {
                                a.AppointmentId,
                                Date = a.AppointmentDate.ToString("yyyy-MM-dd"),
                                Time = DateTime.Today.Add(a.AppointmentTime).ToString("hh:mm tt"),
                                a.Service,
                                a.AdditionalNotes,
                                a.Status,
                                a.UserId,
                                a.Action
                            }).ToList();

            return (FormattedAppointments, (int)HttpStatusCode.OK);

        }
        catch (Exception ex)
        {
            return (new { message = "Could not fetch appointments" }, GetStatusCodeFromException(ex));
        }
    }

    public async Task<(object response, int statusCode)> deleteAppointment(int appointmentId)
    {
        try
        {
            var appointment = await appointmentRepository.GetAppointmentByAppointmentId(appointmentId);

            if (appointment == null)
            {
                return (new { message = "Appointment not found" }, (int)HttpStatusCode.NotFound);
            }

            await appointmentRepository.DeleteAppointment(appointment);

            return (new { message = "Appointment deleted successfully" }, (int)HttpStatusCode.OK);
        }
        catch (Exception ex)
        {

            return (new { message = "Could not delete appointment" }, GetStatusCodeFromException(ex));
        }
    }

    public async Task<(object response, int statusCode)> updateAppointment(UpdateAppointment update)
    {
        try
        {
            var app = await appointmentRepository.GetAppointmentByAppointmentId(update.AppointmentId);

            if (app == null)
            {
                return (new { message = "Appointment not found" }, (int)HttpStatusCode.NotFound);
            }


            mapper.Map(update, app);

            await appointmentRepository.SaveAppointment();

            return (new { message = "Appointment updated successfully", appointment = app }, (int)HttpStatusCode.OK);
        }
        catch (Exception ex)
        {

            return (new { message = "Internal server error" }, GetStatusCodeFromException(ex));
        }
    }

    public async Task<(object response, int statusCode)> getAllAppointments()
    {
        try
        {

            var appointmentsWithUsers = await appointmentRepository.GetAllAppointments();
            if (appointmentsWithUsers == null || !appointmentsWithUsers.Any())
            {
                return (new { message = "No appointments found" }, (int)HttpStatusCode.NotFound);
            }

            var FormattedAppointments = appointmentsWithUsers
            .Select(a => new
            {
                a.AppointmentId,
                a.Service,
                Date = a.AppointmentDate.ToString("yyyy-MM-dd"),
                Time = DateTime.Today.Add(a.AppointmentTime).ToString("hh:mm tt"),
                a.AdditionalNotes,
                a.Status,
                Name = a.User?.Name,
                Id = a.User != null ? a.User.Id : 0,
                Email = a.User?.Email,
                Phone = a.User!.Phone != null ? a.User.Phone : null,

                a.Action
            }).ToList();



            return (FormattedAppointments, (int)HttpStatusCode.OK);
        }
        catch (Exception ex)
        {

            return (new { message = "Failed to fetch the appointments" }, GetStatusCodeFromException(ex));
        }
    }

    public async Task<(object response, int statusCode)> putAppointmentAction(AppointmentAction appointmentAction)
    {
        try
        {
            var app = await appointmentRepository.GetAppointmentByAppointmentId(appointmentAction.AppointmentId);

            if (app == null)
            {
                return (new { message = "Appointment not found" }, (int)HttpStatusCode.NotFound);
            }
            mapper.Map(appointmentAction, app);

            await appointmentRepository.SaveAppointment();
            return (new
            {
                message = appointmentAction.Action ? "Appointment accepted!" : "Appointment rejected!",
                appointment = app
            }, (int)HttpStatusCode.OK);


        }
        catch (Exception ex)
        {

            return (new { message = "Failed to update action" }, GetStatusCodeFromException(ex));
        }

    }

    private int GetStatusCodeFromException(Exception ex)
    {
        switch (ex)
        {
            case SqlException _:
                return (int)HttpStatusCode.InternalServerError;
            case ArgumentNullException _:
                return (int)HttpStatusCode.BadRequest;
            case UnauthorizedAccessException _:
                return (int)HttpStatusCode.Unauthorized;
            case InvalidOperationException _:
                return (int)HttpStatusCode.BadRequest;
            case FileNotFoundException _:
                return (int)HttpStatusCode.NotFound;
            default:
                return (int)HttpStatusCode.InternalServerError;
        }
    }

}
