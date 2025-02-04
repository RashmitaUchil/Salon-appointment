
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useUser } from "../Context/UserContext";
import toast from 'react-hot-toast';
import '../Styles/Book.css'

function Book() {
    const [formData, setFormData] = useState({ date: "", time: "", service: "", notes: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [minDate, setMinDate] = useState("");
    const { userId } = useUser();

    const toastShown = useRef(false);

    
    

    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() );
        setMinDate(tomorrow.toISOString().split("T")[0]);
    }, []);

    useEffect(() => {
        if (!userId && !toastShown.current) {
            toast.error("You need to login first to book appointment");
            toastShown.current = true;  
        }
    }, [userId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        if (!formData.date || !formData.time || !formData.service) {
            toast.error("Enter essential information about the appointment");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:5056/appointment', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    appointmentDate: formData.date,
                    appointmentTime: formData.time,
                    service: formData.service,
                    additionalNotes: formData.notes,
                    status:false
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Failed to book appointment");
            }

            toast.success("Appointment booked successfully!!");
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!userId) {
        return <Navigate to="/login" />;
    }

    return (
        
        <div className="container ">
            <h3 className="h3-head">Book Your Salon Appointment</h3>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <form id="appointmentForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="date" >Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={minDate}
                        defaultValue={minDate}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="time">Time:</label>
                    <input
                        type="time"
                        id="appointmentTime"
                        name="time"
                        min="09:00"
                        max="18:00"
                        value={formData.time}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="service">Service:</label>
                    <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                    >
                        <option value="">Select a service</option>
                        <option value="haircut">Haircut</option>
                        <option value="coloring">Hair Coloring</option>
                        <option value="styling">Hair Styling</option>
                        <option value="makeup">Manicure</option>
                        <option value="manicure">Manicure</option>
                        <option value="pedicure">Pedicure</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="notes">Additional Notes:</label>
                    <textarea
                        id="notes"
                        name="notes"
                        rows="3"
                        value={formData.notes}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button type="submit">
                    {loading ? "Booking..." : "Book Appointment"}
                </button>
            </form>
            </div>
        
    );
}

export default Book;
