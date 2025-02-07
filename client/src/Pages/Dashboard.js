import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import "../Styles/Dashboard.css";
import AppointmentService from "../Services/AppointmentService";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaginatedTable from "../Components/PaginatedTable";
import { ToastContainer, toast as alertToast } from "react-toastify";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);

  const columns = [
    { label: "Service", key: "service" },
    { label: "Date", key: "appointmentDate" },
    { label: "Time", key: "appointmentTime" },
    { label: "Notes", key: "additionalNotes" },
  ];
  const [activeTab, setActiveTab] = useState("upcoming");
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const loadingToast = toast.loading("Loading appointments...");
    try {
      const response = await AppointmentService.get("/dashboard");

      if (Array.isArray(response)) {
        setAppointments(response.filter((app) => app.action !== false));
      } else {
        setAppointments([]);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleReject = (appointmentId) => {
    if (isRejecting) return;

    setIsRejecting(true);

    alertToast.warn(
      <div className="flex flex-col gap-2">
        <p>Are you sure you want to reject this appointment?</p>
        <div className="flex gap-2 justify-end mt-2">
          <div className="button-container">
            <button
              onClick={() => {
                rejectAppointment(appointmentId);
                alertToast.dismiss();
                setIsRejecting(false);
              }}
              className="card-footer-btn-del "
            >
              Yes
            </button>
            <button
              onClick={() => {
                alertToast.dismiss();
                setIsRejecting(false);
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
        onClose: () => setIsRejecting(false),
      }
    );
  };

  const rejectAppointment = async (appointmentId) => {
    try {
      const response = await AppointmentService.put("/action", {
        appointmentId,
        action: false,
      });
      if (response) {
        toast.success(response.message);
        setAppointments((prev) =>
          prev.filter((app) => app.appointmentId !== appointmentId)
        );
      }
    } catch (error) {
      toast.error(error.message || "failed to reject");
    }
  };
  const handleAccept = async (appointmentId) => {
    if (isAccepting) return;

    setIsAccepting(true);

    alertToast.warn(
      <div className="flex flex-col gap-2">
        <p>Accept this appointment?</p>
        <div className="flex gap-2 justify-end mt-2">
          <div className="button-container">
            <button
              onClick={() => {
                acceptAppointment(appointmentId);
                alertToast.dismiss();
                setIsAccepting(false);
              }}
              className="card-footer-btn-del "
            >
              Yes
            </button>
            <button
              onClick={() => {
                alertToast.dismiss();
                setIsAccepting(false);
              }}
              className="card-footer-btn"
            >
              No
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
        onClose: () => setIsAccepting(false), // Reset isDeleting when toast is closed
      }
    );
  };
  const acceptAppointment = async (appointmentId) => {
    try {
      const response = await AppointmentService.put("/action", {
        appointmentId,
        action: true,
      });
      if (response) {
        toast.success(response.message);
        setAppointments((prev) =>
          prev.map((app) =>
            app.appointmentId === appointmentId
              ? { ...app, action: "Accepted" }
              : app
          )
        );
      }
    } catch (error) {
      toast.error(error.message || "failed to accept");
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <ToastContainer limit={1} />
      <div className="dashboard">
        <h1 className="font-sans">Appointments</h1>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === "upcoming" ? "tab-active" : "tab-inactive"}`}
          onClick={() => handleTabChange("upcoming")}
        >
          Upcoming Appointments
        </button>
        <button
          className={`tab ${activeTab === "completed" ? "tab-active" : "tab-inactive"}`}
          onClick={() => handleTabChange("completed")}
        >
          Completed Appointments
        </button>
      </div>

      {/* Appointments */}

      <PaginatedTable
        data={appointments}
        activeTab={activeTab}
        handleDelete={handleReject}
        handleUpdate={handleAccept}
        rowsPerPage="6"
      />
    </>
  );
}

export default Dashboard;
