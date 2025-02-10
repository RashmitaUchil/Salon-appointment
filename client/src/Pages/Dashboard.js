import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { ToastContainer, toast as alertToast } from "react-toastify";
import "../Styles/Dashboard.css";
import AppointmentService from "../Services/AppointmentService";
import PaginatedTable from "../Components/PaginatedTable";
import { Tabs, Tab } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("pending");
  const queryClient = useQueryClient();

  const {
    data: appointments = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const response = await AppointmentService.get("/dashboard");
      return response.filter((app) => app.action !== false);
    },
    refetchInterval: 5000,
  });

  const rejectAppointment = useMutation({
    mutationFn: async (appointmentId) =>
      await AppointmentService.put("/action", {
        appointmentId,
        action: false,
      }),
    onSuccess: (response, appointmentId) => {
      toast.success(response.message);
      queryClient.invalidateQueries(["appointments"]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to reject appointment");
    },
  });

  const acceptAppointment = useMutation({
    mutationFn: async (appointmentId) =>
      await AppointmentService.put("/action", {
        appointmentId,
        action: true,
      }),
    onSuccess: (response, appointmentId) => {
      toast.success(response.message);
      queryClient.invalidateQueries(["appointments"]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to accept appointment");
    },
  });

  const handleReject = (appointmentId) => {
    alertToast(
      <div className="flex flex-col items-center text-center gap-2">
        <p>Are you sure you want to reject this appointment?</p>
        <div className="flex gap-2 justify-end mt-2">
          <button
            onClick={() => {
              rejectAppointment.mutate(appointmentId);
              alertToast.dismiss();
            }}
            className="card-footer-btn-del"
          >
            Yes
          </button>
          <button
            onClick={() => alertToast.dismiss()}
            className="card-footer-btn"
          >
            Cancel
          </button>
        </div>
      </div>,
      { position: "top-center", autoClose: false, closeButton: false }
    );
  };

  const handleAccept = (appointmentId) => {
    alertToast(
      <div className="flex flex-col items-center text-center gap-2">
        <p>Are you sure you want to accept this appointment?</p>
        <div className="flex gap-2 justify-end mt-2">
          <button
            onClick={() => {
              acceptAppointment.mutate(appointmentId);
              alertToast.dismiss();
            }}
            className="card-footer-btn-del"
          >
            Yes
          </button>
          <button
            onClick={() => alertToast.dismiss()}
            className="card-footer-btn"
          >
            Cancel
          </button>
        </div>
      </div>,
      { position: "top-center", autoClose: false, closeButton: false }
    );
  };

  return (
    <>
      <ToastContainer limit={1} />
      <div className="dashboard">
        <h1 className="font-sans">Appointments</h1>
      </div>

      <Tabs
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
        variant="fullWidth"
        sx={{
          "& .MuiTabs-indicator": { backgroundColor: "#A87676" },
          "& .MuiTab-root": { color: "#A87676" },
          "& .MuiTab-root.Mui-selected": { color: "black", fontWeight: "bold" },
        }}
      >
        <Tab value="pending" label="Pending Appointments" />
        <Tab value="upcoming" label="Upcoming Appointments" />
        <Tab value="completed" label="Completed Appointments" />
      </Tabs>

      {isLoading ? (
        <p className="text-muted text-center">Loading appointments...</p>
      ) : error ? (
        <p className="text-danger text-center">Error: {error.message}</p>
      ) : (
        <PaginatedTable
          data={appointments}
          activeTab={activeTab}
          handleDelete={handleReject}
          handleUpdate={handleAccept}
          rowsPerPage="6"
        />
      )}
    </>
  );
}

export default Dashboard;
