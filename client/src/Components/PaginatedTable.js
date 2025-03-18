import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/PaginatedTable.css";
import DataGrid, {
  Column,
  Pager,
  Paging,
  SearchPanel,
  FilterRow,
} from "devextreme-react/data-grid";

const PaginatedTable = ({
  data,

  activeTab,
  handleUpdate,
  handleDelete,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
    <div className="table-container">
      {filteredData.length > 0 ? (
        <>
          <DataGrid
            className="devexpress-container"
            dataSource={filteredData}
            keyExpr="appointmentId"
            showBorders={true}
            columnAutoWidth={true}
            rowAlternationEnabled={true}
          >
            {/* Search & Filtering */}
            <SearchPanel visible={true} highlightCaseSensitive={false} />
            <FilterRow visible={true} />

            {location.pathname === "/dashboard" && (
              <Column dataField="name" alignment="center" caption="Name" />
            )}
            <Column dataField="service" alignment="center" caption="Service" />
            <Column
              alignment="center"
              dataField="date"
              caption="Date"
              dataType="date"
              format="dd/MM/yyyy"
            />
            <Column dataField="time" caption="Time" alignment="center" />
            <Column
              dataField="additionalNotes"
              caption="Notes"
              alignment="center"
              calculateCellValue={(data) =>
                data.additionalNotes || "No Notes Available"
              }
            />

            {/* Actions Column */}
            {(activeTab === "pending" ||
              (activeTab === "booked" && location.pathname === "/app") ||
              (activeTab === "upcoming" && location.pathname === "/app")) && (
              <Column
                caption="Actions"
                alignment="center"
                cellRender={({ data }) => (
                  <div className="action-div">
                    {activeTab === "pending" && (
                      <>
                        <button
                          className="text-center action-btn"
                          title="Accept Appointment"
                          onClick={() => handleUpdate(data.appointmentId)}
                        >
                          <CheckCircleIcon />
                        </button>
                        <button
                          className="action-btn-del"
                          title="Reject Appointment"
                          onClick={() => handleDelete(data.appointmentId)}
                        >
                          <DeleteIcon />
                        </button>
                      </>
                    )}
                    {activeTab === "booked" && (
                      <button
                        className="action-btn-del"
                        title="Delete Appointment"
                        onClick={() => handleDelete(data.appointmentId)}
                      >
                        <DeleteIcon />
                      </button>
                    )}
                    {activeTab === "upcoming" &&
                      location.pathname === "/app" && (
                        <>
                          <button
                            className="action-btn"
                            title="Check Appointment as Done"
                            onClick={() => handleUpdate(data.appointmentId)}
                          >
                            <CheckCircleIcon />
                          </button>
                          <button
                            className="action-btn-del"
                            title="Delete Appointment"
                            onClick={() => handleDelete(data.appointmentId)}
                          >
                            <DeleteIcon />
                          </button>
                        </>
                      )}
                  </div>
                )}
              />
            )}

            {/* Pagination */}
            <Paging defaultPageSize={5} />
            <Pager
              visible={true}
              showPageSizeSelector={true}
              allowedPageSizes={[5, 10, 20]}
            />
          </DataGrid>
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
            appointments.
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
