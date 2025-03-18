using backend.Data.IRepository;
using backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly ApplicationDbContext dbContext;

        public AppointmentRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public async Task<IEnumerable<Appointment>?> GetAppointmentByUserId(int userId)
        {
            var appointment = await dbContext.Appointments.Where(x => x.UserId == userId)
            .OrderByDescending(x => x.AppointmentDate)
            .ThenByDescending(x => x.AppointmentTime)
            .ToListAsync();
            return appointment;
        }

        public async Task<Appointment?> GetAppointmentByAppointmentId(int appointmentId)
        {
            var app = await dbContext.Appointments.FirstOrDefaultAsync(x => x.AppointmentId == appointmentId);
            return app;

        }

        public async Task DeleteAppointment(Appointment appointment)
        {
            dbContext.Appointments.Remove(appointment);
            await dbContext.SaveChangesAsync();

        }

        public async Task AddAppointment(Appointment appointment)
        {
            dbContext.Appointments.Add(appointment);
            await dbContext.SaveChangesAsync();

        }

        public async Task SaveAppointment()
        {
            await dbContext.SaveChangesAsync();

        }

        public async Task<IEnumerable<Appointment>?> GetAllAppointments()
        {
            var appointment = await dbContext.Appointments
            .Include(a => a.User)
            .OrderBy(x => x.AppointmentDate)
            .OrderBy(x => x.AppointmentTime)
            .ToListAsync();
            return appointment;
        }
    }
}