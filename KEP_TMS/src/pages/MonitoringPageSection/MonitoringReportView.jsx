import { Button } from "primereact/button";
import CommonTable from "../../components/General/CommonTable";
import { SectionHeading } from "../../components/General/Section";
import StatusColor from "../../components/General/StatusColor";
import proptype from "prop-types";
import { useState } from "react";
import { Card } from "react-bootstrap";
import EffectivenessForm from "../../components/forms/EffectivenessForm";
import TrainingReportForm from "../../components/forms/TrainingReportForm";
import EvaluationForm from "../../components/forms/EvaluationForm";
import { ActivityType } from "../../api/constants";
import getStatusById from "../../utils/status/getStatusById";
const MonitoringReportView = ({ data, reportType, tableName, hasApprover, formData, typeId }) => {
    const [showForm, setShowForm] = useState(false);
    const [selectedData, setSelectedData] = useState({});
  const actionTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-eye"
          text
          className="rounded-circle"
          onClick={() => {setSelectedData(rowData);
            setShowForm(true);
          }}
          disabled={rowData[reportType]?.statusName ? false : true}
        />
      </>
    );
  };
  const columnItems = [
    {
      field: "id",
      header: "No",
      body: (_, { rowIndex }) => <>{rowIndex + 1}</>,
    },
    {
      field: "employeeBadge",
      header: "Badge No",
      body: (rowData) => <>{rowData?.userDetail?.employeeBadge}</>,
    },
    {
      field: "fullname",
      header: "Name",
      body: (rowData) => <>{rowData?.userDetail?.fullname}</>,
    },
    {
      field: "position",
      header: "Position",
      body: (rowData) => <>{rowData?.userDetail?.position}</>,
    },
    {
      field: "department",
      header: "Department",
      body: (rowData) => <>{rowData?.userDetail?.departmentName}</>,
    },
    {
      field: "department",
      header: "Status",
      body: (rowData) => (
        <>
          {StatusColor({
            status: getStatusById(rowData[reportType]?.currentRouting?.statusId) ?? "Pending",
            showStatus: true,
          })}
        </>
      ),
    },
    hasApprover
      ? {
          field: "department",
          header: "Approver",
          body: (rowData) => <>{rowData[reportType]?.currentRouting?.assignedDetail?.fullname ?? "N/A"}</>,
        }
      : [],
    {
      field: "department",
      header: "Action",
      body: actionTemplate,
    },
  ];

  return (
    <>
    {!showForm ?<>
      <SectionHeading
        title={`Training ${tableName ? tableName : "Forms"} Monitoring`}
        icon={<i className="pi pi-clock"></i>}
      />
      <CommonTable
        dataTable={formData?.data}
        columnItems={columnItems}
        tableName={tableName ? tableName : `Training Participants`}
      /></> : <>
      <Card>
        <Card.Header className="text-end">
          <Button
            type="button"
            icon="pi pi-times"
            size="small"
            text
            className="rounded-circle"
            onClick={() => setShowForm(false)}
          />
        </Card.Header>
        {selectedData[reportType]?.id ?<>
        {typeId === ActivityType.EFFECTIVENESS && 
        <EffectivenessForm
          data={data}
          userData={selectedData?.userDetail}
          formData={selectedData[reportType]}
          currentRouting={selectedData?.effectivenessDetail?.currentRouting}
          auditTrail={selectedData?.effectivenessDetail?.auditTrail}
        />}
        {typeId === ActivityType.REPORT && 
        <TrainingReportForm
          data={data}
          userData={selectedData?.userDetail}
          defaultValue={selectedData[reportType]}

          // currentRouting={{}}
          isSubmitted
        />}
        {typeId === ActivityType.EVALUATION && 
        <EvaluationForm
          data={data}
          userData={selectedData?.userDetail}
          formData={selectedData[reportType]}
        />}</>:
        <div className="text-center py-5">No data available</div> }
      </Card>
      </>}
    </>
  );
};

MonitoringReportView.propTypes = {
  data: proptype.object,
  reportType: proptype.string,
  tableName: proptype.string,
  hasApprover: proptype.bool,
  formData: proptype.object,
};
export default MonitoringReportView;
