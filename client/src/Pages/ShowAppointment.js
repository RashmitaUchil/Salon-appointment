import { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../Styles/ShowAppointment.css';
function ShowApp() {
    const { userId } = useUser();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppointments = async () => {
            if (!userId) {
                setLoading(false);
                return;
            }

            toast.loading('Loading appointments...');

            try {
                const response = await fetch(`http://localhost:5056/appointment?userId=${userId}`);

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.message || "You have no appointments");
                }

                const data = await response.json();
                setAppointments(Array.isArray(data) ? data : []);
            } catch (error) {
                setError(error.message);
            } finally {
                toast.dismiss();
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [userId]);

    const handleDelete = async (appointmentId) => {
        try {
            const response = await fetch(`http://localhost:5056/appointment?appointmentId=${appointmentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setAppointments(appointments.filter(app => app.appointmentId !== appointmentId));
                toast.success('Appointment deleted successfully');
            } else {
                throw new Error('Failed to delete appointment');
            }
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    
    const formatTime = (timeSpan) => {
        if (!timeSpan) return "N/A";  
        return timeSpan.substring(0, 5);
    };


    const handleUpdate = async (appointmentId) => {
        try {
            const response = await fetch(`http://localhost:5056/appointment/`,
                {
                    method: 'PUT',
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify
                    ({
                        appointmentId,
                        status:true
                    })

                });
            if (response.ok) {
                setAppointments((prev) =>
                    prev.map(app =>
                        app.appointmentId === appointmentId ? { ...app, status: true } : app
                    )
                );

                toast.success('Status updated successfully')
            }
            else {
                toast.error("could not update status. try again!");
            }

        }
        catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    }



    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <p className="text-muted">Loading appointments...</p>
            </div>
        );
    }

    const completedAppointments = appointments.filter((app) => app.status === true);
    const upcomingAppointments = appointments.filter((app) => app.status === false);
    return (
        <>
       
            <h1 className="text-center mb-4" >
                My Appointments</h1>
       
           

            {appointments.length === 0 ? (
                <div className="py-4 text-center" >
                    {error && <p className=" text-center">{error}</p>}
                        <button
                            onClick={() => navigate('/book')}
                            className="btn my-2 custom-button" 
                        >
                            Book an Appointment
                        </button>

                </div>
            ) : (<>
                    <div>
                <span>
                   
                    {/* Upcoming Appointments Section */}
                    
                    {upcomingAppointments.length > 0 && (
                                <div className="py-4 container-xl con-app">
                     
                            <h4 className="h4-upcoming">Upcoming Appointments</h4>
                            <div className="row row-cols-1 row-cols-md-2 g-4">
                                {upcomingAppointments.map((appointment) => (
                                    <div key={appointment.appointmentId} className="col">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <h5 className="card-title mb-0" >
                                                        {appointment.service}
                                                    </h5>
                                                    <span className="status-tag status-upcoming">Upcoming</span>
                                                </div>
                                                <div className="card-text">
                                                    <p className="mb-2" >
                                                        <strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}
                                                    </p>
                                                    <p className="mb-2" >
                                                        <strong>Time:</strong> {formatTime(appointment.appointmentTime)}
                                                    </p>
                                                    {appointment.additionalNotes && (
                                                        <p className="mb-2">
                                                            <strong>Notes:</strong> {appointment.additionalNotes}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="card-footer bg-transparent border-top-0 p-3">
                                                <button className="card-footer-btn" onClick={() => handleUpdate(appointment.appointmentId)}>
                                                    Update Status
                                                </button>
                                                <button className="card-footer-btn-del" onClick={() => handleDelete(appointment.appointmentId)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            </div>
                    
                    )}
                    {/* Completed Appointments Section */}
                    {completedAppointments.length > 0 && (
                                <div className="py-4 container-xl con-app">
                      
                            <h4 className="h4-completed">Completed Appointments</h4>
                            <div className="row row-cols-1 row-cols-md-2 g-4">
                                {completedAppointments.map((appointment) => (
                                    <div key={appointment.appointmentId} className="col">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <h5 className="card-title mb-0" >
                                                        {appointment.service}
                                                    </h5>
                                                    <span className="status-tag status-completed">Completed</span>
                                                </div>
                                                <div className="card-text">
                                                    <p className="content mb-2">
                                                        <strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}
                                                    </p>
                                                    <p className="content mb-2">
                                                        <strong>Time:</strong> {formatTime(appointment.appointmentTime)}
                                                    </p>
                                                    {appointment.additionalNotes && (
                                                        <p className="content mb-2" >
                                                            <strong>Notes:</strong> {appointment.additionalNotes}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            </div>
                    
                    )}
                </span>

               </div>


                </>
                   
                 
            )}
            
       
        </>
    );
}

export default ShowApp;