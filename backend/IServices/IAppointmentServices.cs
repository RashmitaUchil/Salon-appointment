using Microsoft.AspNetCore.Mvc;
using backend.Models.Dtos;
using backend.Models.Entities;


namespace backend.IServices
{
    public interface IAppointmentServices
    {
        Task<(object response, int statusCode)> addAppointment(AddAppointment request);
        Task<(object response, int statusCode)> getUserAppointments(int userId);
        Task<(object response, int statusCode)> deleteAppointment(int appointmentId);
        Task<(object response, int statusCode)> updateAppointment(UpdateAppointment update);
        Task<(object response, int statusCode)> getAllAppointments();
        Task<(object response, int statusCode)> putAppointmentAction(AppointmentAction appointmentAction);


    }

}