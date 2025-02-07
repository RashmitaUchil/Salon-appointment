import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginatedTable = ({
  data,
  rowsPerPage,
  activeTab,
  handleUpdate,
  handleDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const filteredData =
    activeTab === "upcoming"
      ? data.filter((app) => !app.status)
      : data.filter((app) => app.status);

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
          <p className="status-name">
            {activeTab === "upcoming"
              ? "Upcoming Appointments"
              : "Completed Appointments"}
          </p>
          <table
            className={`appointment-table ${activeTab === "upcoming" ? "appointment-table-up" : ""}`}
          >
            <thead>
              <tr>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Notes</th>
                {activeTab === "upcoming" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentData.map((appointment) => (
                <tr key={appointment.appointmentId}>
                  <td>{appointment.service}</td>
                  <td>
                    {new Date(appointment.appointmentDate).toLocaleDateString()}
                  </td>
                  <td>{formatTime(appointment.appointmentTime)}</td>
                  <td>{appointment.additionalNotes || "N/A"}</td>
                  {activeTab === "upcoming" && (
                    <td>
                      {appointment.action === "Accepted" ? (
                        <span className="text-green-600 font-bold">
                          Accepted
                        </span> // Show "Accepted"
                      ) : (
                        <>
                          <button
                            className="action-btn"
                            onClick={() =>
                              handleUpdate(appointment.appointmentId)
                            }
                          >
                            <CheckCircleIcon />
                          </button>
                          <button
                            className="action-btn-del"
                            onClick={() =>
                              handleDelete(appointment.appointmentId)
                            }
                          >
                            <DeleteIcon />
                          </button>
                        </>
                      )}
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
        <p className="text-center">
          No {activeTab === "upcoming" ? "upcoming" : "completed"} appointments
        </p>
      )}
    </div>
  );
};

export default PaginatedTable;
