import { useState } from "react";
import { useUser } from "../Context/UserContext";
import { toast as hotToast } from "react-hot-toast";
import "../Styles/ShowAppointment.css";
import { ToastContainer, toast as alertToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppointmentService from "../Services/AppointmentService";
import { Tabs, Tab } from "@mui/material";
import PaginatedTable from "../Components/PaginatedTable";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function ShowApp() {
  const { userId } = useUser();
  const [activeTab, setActiveTab] = useState("booked");
  const queryClient = useQueryClient();

  const { data: appointments = [] } = useQuery({
    queryKey: ["appointments", userId],
    queryFn: async () => {
      if (!userId) return [];
      const response = await AppointmentService.get(`?userId=${userId}`);
      return Array.isArray(response) ? response : [];
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchInterval: () => {
      const existingData = queryClient.getQueryData(["appointments", userId]);
      return existingData?.length > 0 ? 3000 : 2000;
    },
  });

  const deleteAppointmentMutation = useMutation({
    mutationFn: async (appointmentId) => {
      return await AppointmentService.delete(`?appointmentId=${appointmentId}`);
    },
    onSuccess: (response, appointmentId) => {
      hotToast.success(
        response ? response.message : "Appointment deleted successfully"
      );

      queryClient.setQueryData(
        ["appointments", userId],
        (oldAppointments) =>
          oldAppointments?.filter(
            (app) => app.appointmentId !== appointmentId
          ) || []
      );

      queryClient.invalidateQueries(["appointments", userId]);
    },
    onError: (error) => {
      hotToast.error(error ? error.message : "Failed to delete appointment");
    },
  });

  const updateAppointmentMutation = useMutation({
    mutationFn: async (appointmentId) => {
      return await AppointmentService.put(`/update`, {
        appointmentId,
        status: true,
      });
    },
    onSuccess: (response, appointmentId) => {
      hotToast.success(
        response ? response.message : "Appointment status updated"
      );

      queryClient.setQueryData(
        ["appointments", userId],
        (oldAppointments) =>
          oldAppointments?.map((app) =>
            app.appointmentId === appointmentId ? { ...app, status: true } : app
          ) || []
      );

      queryClient.invalidateQueries(["appointments", userId]);
    },
    onError: (error) => {
      hotToast.error(error ? error.message : "Failed to update appointment");
    },
  });

  const handleDelete = (appointmentId) => {
    alertToast(
      <div className="flex flex-col items-center text-center gap-2">
        <p>Are you sure you want to delete this appointment?</p>
        <div className="flex gap-2 justify-end mt-2">
          <div className="button-container">
            <button
              onClick={() => {
                deleteAppointmentMutation.mutate(appointmentId);
                alertToast.dismiss();
              }}
              className="card-footer-btn"
            >
              Yes
            </button>
            <button
              onClick={() => alertToast.dismiss()}
              className="card-footer-btn-del"
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
        className: "custom-toast",
      }
    );
  };

  const handleUpdate = (appointmentId) => {
    alertToast(
      <div className="flex flex-col items-center text-center gap-2">
        <p>Mark this appointment as completed?</p>
        <div className="flex gap-2 justify-end mt-2">
          <div className="button-container">
            <button
              onClick={() => {
                updateAppointmentMutation.mutate(appointmentId);
                alertToast.dismiss();
              }}
              className="card-footer-btn"
            >
              Yes
            </button>
            <button
              onClick={() => alertToast.dismiss()}
              className="card-footer-btn-del"
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
        className: "custom-toast",
      }
    );
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <ToastContainer limit={1} />

      <br />
      <Tabs
        value={activeTab}
        onChange={(event, newValue) => handleTabChange(newValue)}
        variant="fullWidth"
        sx={{
          "& .MuiTabs-indicator": { backgroundColor: "#A87676" },
          "& .MuiTab-root": { color: "#A87676" },
          "& .MuiTab-root.Mui-selected": {
            color: "black",
            fontWeight: "bold",
          },
        }}
      >
        <Tab value="booked" label="Booked Appointments" />
        <Tab value="upcoming" label="Upcoming Appointments" />
        <Tab value="rejected" label="Rejected Appointments" />
        <Tab value="completed" label="Completed Appointments" />
      </Tabs>

      <PaginatedTable
        data={appointments}
        rowsPerPage="4"
        activeTab={activeTab}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default ShowApp;
