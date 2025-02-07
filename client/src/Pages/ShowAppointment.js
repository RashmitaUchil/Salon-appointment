import { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast as hotToast } from "react-hot-toast";
import "../Styles/ShowAppointment.css";
import { ToastContainer, toast as alertToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppointmentService from "../Services/AppointmentService";

import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaginatedTable from "../Components/PaginatedTable";

function ShowApp() {
  const { userId } = useUser();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      hotToast.loading("Loading appointments...");

      try {
        const response = await AppointmentService.get(`?userId=${userId}`);
        setAppointments(Array.isArray(response) ? response : []);
        console.log("appointments");
        setError(null);
      } catch (error) {
        setError(error.message || "failed to fetch");
        setAppointments([]);
      } finally {
        hotToast.dismiss();
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userId]);

  const handleDelete = (appointmentId) => {
    if (isDeleting) return;

    setIsDeleting(true);

    alertToast.warn(
      <div className="flex flex-col gap-2">
        <p>Are you sure you want to delete this appointment?</p>
        <div className="flex gap-2 justify-end mt-2">
          <div className="button-container">
            <button
              onClick={() => {
                deleteAppointment(appointmentId);
                alertToast.dismiss();
                setIsDeleting(false);
              }}
              className="card-footer-btn-del "
            >
              Yes
            </button>
            <button
              onClick={() => {
                alertToast.dismiss();
                setIsDeleting(false);
              }}
              className="card-footer-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeButton: false,
        closeOnClick: false,
        draggable: false,
        onClose: () => setIsDeleting(false), // Reset isDeleting when toast is closed
      }
    );
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      const response = await AppointmentService.delete(
        `?appointmentId=${appointmentId}`
      );

      hotToast.success(response.message);
      setAppointments((prevAppointments) =>
        prevAppointments.filter((app) => app.appointmentId !== appointmentId)
      );
    } catch (error) {
      setError(error.message);
      hotToast.error(error.message || "failed to delete");
    }
  };

  const handleUpdate = async (appointmentId) => {
    if (isUpdating) return;

    setIsUpdating(true);

    alertToast.warn(
      <div className="flex flex-col gap-2">
        <p>are you sure you want to set this appointment as done</p>
        <div className="flex gap-2 justify-end mt-2">
          <div className="button-container">
            <button
              onClick={() => {
                updateAppointment(appointmentId);
                alertToast.dismiss();
                setIsUpdating(false);
              }}
              className="card-footer-btn-del "
            >
              Yes
            </button>
            <button
              onClick={() => {
                alertToast.dismiss();
                setIsUpdating(false);
              }}
              className="card-footer-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeButton: false,
        closeOnClick: false,
        draggable: false,
        onClose: () => setIsUpdating(false), // Reset isDeleting when toast is closed
      }
    );
  };
  const updateAppointment = async (appointmentId) => {
    try {
      const response = await AppointmentService.put(`/update`, {
        appointmentId,
        status: true,
      });
      if (response) {
        setAppointments((prev) =>
          prev.map((app) =>
            app.appointmentId === appointmentId ? { ...app, status: true } : app
          )
        );
      }
      hotToast.success("Status updated successfully");
    } catch (error) {
      setError(error.message);
      hotToast.error(error.message);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <p className="text-muted">Loading appointments...</p>
      </div>
    );
  }

  return (
    <>
      {/* ----------------------------------------- */}
      <ToastContainer limit={1} />
      <h1 className="text-center mb-4">My Appointments</h1>

      {appointments.length === 0 ? (
        <div className="container py-1 text-center">
          {error && <p className="text-danger fw-bold">{error}</p>}
          <div className="d-flex justify-content-center">
            <button
              onClick={() => navigate("/book")}
              className="btn my-2 custom-button"
            >
              Book an Appointment
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="tabs">
            <button
              className={`tab ${activeTab === "upcoming" ? "tab-inactive" : "tab-active"}`}
              onClick={() => handleTabChange("upcoming")}
            >
              Upcoming Appointments
            </button>
            <button
              className={`tab ${activeTab === "completed" ? "tab-inactive" : "tab-active"}`}
              onClick={() => handleTabChange("completed")}
            >
              Completed Appointments
            </button>
          </div>

          <PaginatedTable
            data={appointments}
            rowsPerPage="4"
            activeTab={activeTab}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        </>
      )}

      {/* ------------------------------------- */}
    </>
  );
}

export default ShowApp;
