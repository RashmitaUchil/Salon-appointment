import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import toast from "react-hot-toast";
import "../Styles/Book.css";
import AppointmentService from "../Services/AppointmentService";
import { useMutation } from "@tanstack/react-query";

function Book() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    service: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [minDate, setMinDate] = useState("");
  const { userId } = useUser();
  const toastShown = useRef(false);

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
      const isLoggingOut = localStorage.getItem("isLoggingOut");
      const isLoggingIn = localStorage.getItem("isLoggingIn");
    if (!userId && !toastShown.current) {
      if (isLoggingOut !== "true" && isLoggingIn !=="true") {
        toast.dismiss();
        toast.error("You need to login first to book appointment");
        navigate("/login");
        toastShown.current = true;
      }
      localStorage.removeItem("isLoggingOut");
    }
  }, [userId, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const bookAppointmentMutation = useMutation({
    mutationFn: async () => {
      setLoading(true);
      return await AppointmentService.post("/book", {
        userId,
        appointmentDate: formData.date,
        appointmentTime: formData.time,
        service: formData.service,
        additionalNotes: formData.notes,
        status: false,
      });
    },

    onSuccess: (response) => {
      toast.dismiss();
      toast.success(response.message);
      setTimeout(() => navigate("/"));
      setLoading(false);
    },

    onError: (error) => {
      toast.dismiss();
      toast.error(error ? error.message : "Failed to book appointment");
      setLoading(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date || !formData.time || !formData.service) {
      toast.error("Enter essential information about the appointment");
      return;
    }
    bookAppointmentMutation.mutate();
  };

  return (
    <div className=" book">
      <h4 className="h4-head">Book Your Salon Appointment</h4>

      <form id="appointmentForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            className="input-book"
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
            className="input-book"
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
        <button className="button-app" type="submit">
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
}

export default Book;
