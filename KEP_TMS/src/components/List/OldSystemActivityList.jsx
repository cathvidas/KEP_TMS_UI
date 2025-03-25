import CommonTable from "../General/CommonTable";
import proptype from "prop-types";
import { Button } from "primereact/button";
import { SectionHeading } from "../General/Section";
import oldTrainingsHook from "../../hooks/oldTrainingsHook";
import { formatDateTime } from "../../utils/datetime/Formatting";

const OldSystemActivityList = ({ reqId}) => {
    const {data, loading} = oldTrainingsHook.useTrainingActivities(reqId);
  const actionBodyTemplate = () => (
    <div>
      <Button
        type="button"
        icon="pi pi-envelope"
        text
        className="py-0"
        disabled
      />
      <Button
        type="button"
        icon="pi pi-directions"
        title="Route Approvers"
        className="py-0"
        text
        disabled/>
    </div>
  );
  const routeItems = [
    { field: "no", header: "No", body:(_,{rowIndex})=><>{rowIndex+1}</> },
    { field: "processedBy", header: "Name" },
    { field: "title", header: "Title" },
    { field: "status", header: "Status" },
    { field: "approvedDate", header: "Approved Date", body: (rowData)=><>{formatDateTime(rowData.approvedDate)}</> },
    { field: "", header: "Action", body: actionBodyTemplate },
  ];
  const actItems = [
    { field: "no", header: "No", body:(_,{rowIndex})=><>{rowIndex+1}</> },
    { field: "processedBy", header: "Processed By" },
    { field: "status", header: "Process" },
    { field: "approvedDate", header: "Date", body: (rowData)=><>{formatDateTime(rowData.approvedDate)}</> },
    { field: "remarks", header: "Remarks", body: (rowData)=><>{rowData?.remarks ? rowData.remarks : "N/A"}</> },
  ];
  return (
    <>
      <SectionHeading title="Routes" />
      <CommonTable
        dataTable={data?.filter((x) => x.title)}
        columnItems={routeItems}
        hideHeader
        hidePaginator
        dataKey={"id"}
        loading={loading}
      />
      <br />
      <SectionHeading title="Activities" />
      <CommonTable
        dataTable={data}
        columnItems={actItems}
        hideHeader
        hidePaginator
        dataKey={"id"}
        loading={loading}
      />
    </>
  );
};
OldSystemActivityList.propTypes = {
  reqId: proptype.number,
  show: proptype.bool,
  toggle: proptype.bool,
  label: proptype.string,
};
export default OldSystemActivityList;
