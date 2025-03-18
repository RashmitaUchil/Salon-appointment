import React from "react";
import appointmentService from "../Services/AppointmentService";

import { useQuery } from "@tanstack/react-query";
import DataGrid, {
  Column,
  DataGridTypes,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
} from "devextreme-react/data-grid";
function Alldata() {
  const {
    data: appointments = [],

    isLoading,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const response = await appointmentService.get("/dashboard");
      return response.filter((app) => app.action !== false);
    },
    refetchInterval: 5000,
  });

  if (isLoading) {
    return <p>loading data</p>;
  }
  return (
    <div style={{ padding: "20px" }}>
      <h2>DevExpress DataGrid Example</h2>
      <DataGrid dataSource={appointments} keyExpr="appointmentId">
        <GroupPanel visible={true} />
        <SearchPanel visible={true} />

        <Column dataField="appointmentId" caption="ID" />
        <Column dataField="service" caption="Service" />
        <Column dataField="name" caption="Name" />

        <Pager
          visible={true}
          allowedPageSizes={[5, 10, 20]}
          showPageSizeSelector={true}
        />
        <Paging defaultPageSize={5} />
      </DataGrid>
    </div>
  );
}

export default Alldata;
