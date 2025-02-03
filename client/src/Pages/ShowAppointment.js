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
        if (!userId) {
            setLoading(false);
            return;
        }

        toast.loading('Loading appointments...');

        fetch(`http://localhost:5056/appointment/user/${userId}`)
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 404) {
                        setError('You have no appointments yet');
                        throw new Error('You have no appointments yet');
                    }
                    throw new Error('Failed to fetch appointments');
                }
                return response.json();
            })
            .then((data) => {
                setAppointments(Array.isArray(data) ? data : []);
                toast.dismiss();
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                toast.dismiss();
                setLoading(false);
            });
    }, [userId]);

    const handleDelete = async (appointmentId) => {
        try {
            const response = await fetch(`http://localhost:5056/appointment/${appointmentId}`, {
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
        return timeSpan.substring(0, 5);
    };

    //if (!userId) {
    //    return (
    //        <div className="d-flex justify-content-center align-items-center min-vh-100">
    //            <p className="text-muted">Please log in to view your appointments</p>
    //        </div>
    //    );
    //}

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <p className="text-muted">Loading appointments...</p>
            </div>
        );
    }

    return (
        <>
       
            <h1 className="text-center mb-4" style={{ color: '#800080', fontSize: '2rem', marginTop:"20px" }}>My Appointments</h1>
       
           

            {appointments.length === 0 ? (
                <div className="py-4 text-center" style={{ backgroundcolor: '#F5E2D6' } }>
                    {error && <p className=" text-center">{error}</p>}
                        <button
                            onClick={() => navigate('/book')}
                            className="btn my-2 custom-button" 
                        >
                            Book an Appointment
                        </button>

                </div>
            ) : (
                    <div className="py-4 container-xl" >
                <div className=" row row-cols-1 row-cols-md-2 g-4  l">
                    {appointments.map((appointment) => (
                        <div key={appointment.appointmentId} className="col">
                            <div className="card h-100" >
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="card-title mb-0" style={{ color: '#6a0572', fontSize: '1.25rem' }}>
                                            {appointment.service}
                                        </h5>
                                        <span
                                            className={`status-tag 
                                                ${appointment.status === 'Upcoming' ? 'status-upcoming' : ''} 
                                                ${appointment.status === 'Completed' ? 'status-completed' : ''} 
                                                //${appointment.status === 'Cancelled' ? 'status-cancelled' : ''}`
                                            }
                                        >
                                            {appointment.status}
                                        </span>
                                    </div>

                                    <div className="card-text">
                                        <p className="mb-2" style={{ color: '#800080' }}>
                                            <strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}
                                        </p>
                                        <p className="mb-2" style={{ color: '#800080' }}>
                                            <strong>Time:</strong> {formatTime(appointment.appointmentTime)}
                                        </p>
                                        {appointment.additionalNotes && (
                                            <p className="mb-2" style={{ color: '#800080' }}>
                                                <strong>Notes:</strong> {appointment.additionalNotes}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                {appointment.status === 'Upcoming' && (
                                    <div className="card-footer bg-transparent border-top-0 p-3">
                                        <button
                                            onClick={() => handleDelete(appointment.appointmentId)}
                                           
                                            
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            )}
       
        </>
    );
}

export default ShowApp;