using AutoMapper;
using backend.Models.Entities;
using backend.Models.Dtos;

namespace backend.Models
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UpdateUser>();
            CreateMap<UpdateUser, User>();


            CreateMap<User, SignupRequest>();
            CreateMap<SignupRequest, User>()
                .ForMember(dest => dest.Password, opt => opt.Ignore());


            CreateMap<Appointment, AddAppointment>();
            CreateMap<AddAppointment, Appointment>();

            CreateMap<Appointment, UpdateAppointment>();
            CreateMap<UpdateAppointment, Appointment>();

            CreateMap<Appointment, AppointmentAction>();
            CreateMap<AppointmentAction, Appointment>();

        }
    }
}
