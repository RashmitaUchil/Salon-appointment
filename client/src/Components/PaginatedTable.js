import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/PaginatedTable.css";

const PaginatedTable = ({
  data,
  rowsPerPage,
  activeTab,
  handleUpdate,
  handleDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const filteredData = data.filter((app) => {
    if (activeTab === "upcoming") {
      return app.status === false && app.action === true;
    } else if (activeTab === "completed") {
      return app.status === true;
    } else if (activeTab === "rejected") {
      return app.status === false && app.action === false;
    } else if (activeTab === "booked") {
      return app.status === false && app.action === null;
    } else {
      return app.action === null && app.status === false;
    }
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(hours, minutes);

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="table-container">
      {filteredData.length > 0 ? (
        <>
          <table
            className={`appointment-table 
                  ${activeTab === "pending" ? "appointment-table-6" : ""} 
                  ${activeTab === "booked" ? "appointment-table-5" : ""}
                  ${activeTab === "upcoming" ? "appointment-table-5" : ""}
                  ${activeTab === "upcoming" && location.pathname === "/dashboard" ? "appointment-table-5" : ""}`}
          >
            <thead>
              <tr>
                {location.pathname === "/dashboard" && <th>Name</th>}
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Notes</th>
                {(activeTab === "pending" ||
                  (activeTab === "booked" && location.pathname === "/app") ||
                  (activeTab === "upcoming" &&
                    location.pathname === "/app")) && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentData.map((appointment) => (
                <tr key={appointment.appointmentId}>
                  {location.pathname === "/dashboard" && (
                    <td>{appointment.name}</td>
                  )}
                  <td>{appointment.service}</td>
                  <td>
                    {new Date(appointment.appointmentDate).toLocaleDateString(
                      "en-GB"
                    )}
                  </td>
                  <td>{formatTime(appointment.appointmentTime)}</td>
                  <td>{appointment.additionalNotes || "No Note"}</td>
                  {activeTab === "pending" && (
                    <td>
                      <button
                        className="action-btn"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Accept Appointment"
                        onClick={() => handleUpdate(appointment.appointmentId)}
                      >
                        <CheckCircleIcon />
                      </button>

                      <button
                        className="action-btn-del"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Reject Appointment"
                        onClick={() => handleDelete(appointment.appointmentId)}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  )}
                  {activeTab === "booked" && (
                    <td>
                      <button
                        className="action-btn-del"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Delete Appointment"
                        onClick={() => handleDelete(appointment.appointmentId)}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  )}
                  {activeTab === "upcoming" && location.pathname === "/app" && (
                    <td>
                      <button
                        className="action-btn"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Check Appointment as Done"
                        onClick={() => handleUpdate(appointment.appointmentId)}
                      >
                        <CheckCircleIcon />
                      </button>
                      <button
                        className="action-btn-del"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Delete Appointment"
                        onClick={() => handleDelete(appointment.appointmentId)}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          {/* Pagination Section */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <Stack spacing={2} alignItems="center" justifyContent="flex">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(event, page) => setCurrentPage(page)}
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>
            </div>
          )}
        </>
      ) : (
        <>
          <p className="text-center no-apps">
            No{" "}
            {activeTab === "upcoming"
              ? "upcoming"
              : activeTab === "completed"
                ? "completed"
                : "pending"}{" "}
            appointments
            {activeTab === "booked" ? (
              <>
                <p>
                  <b>
                    If booked previously, check upcoming or rejected
                    appointments tab OR
                  </b>
                </p>
                <button
                  onClick={() => navigate("/book")}
                  className="btn my-2 custom-button"
                >
                  Book an Appointment
                </button>
              </>
            ) : (
              ""
            )}
          </p>
        </>
      )}
    </div>
  );
};

export default PaginatedTable;
