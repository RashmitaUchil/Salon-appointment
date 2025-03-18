using backend.Models.Entities;

namespace backend.Data.IRepository
{
    public interface IAppointmentRepository
    {
        Task<IEnumerable<Appointment>?> GetAppointmentByUserId(int userId);
        Task<Appointment?> GetAppointmentByAppointmentId(int appointmentId);
        Task DeleteAppointment(Appointment appointment);
        Task AddAppointment(Appointment appointment);
        Task SaveAppointment();
        Task<IEnumerable<Appointment>?> GetAllAppointments();

    }
}