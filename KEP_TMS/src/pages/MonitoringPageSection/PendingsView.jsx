import { SectionHeading } from "../../components/General/Section";
import StatusColor from "../../components/General/StatusColor";
import proptype from "prop-types";
import CommonTable from "../../components/General/CommonTable";
import { useState } from "react";
import { ActivityType } from "../../api/constants";
import EffectivenessForm from "../../components/forms/EffectivenessForm";
import { Card } from "react-bootstrap";
import { Button } from "primereact/button";
import TrainingReportForm from "../../components/forms/TrainingReportForm";
import EvaluationForm from "../../components/forms/EvaluationForm";
import getStatusById from "../../utils/status/getStatusById";
const PendingView = ({ data, formData }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [formType, setFormType] = useState({});
  const handleOnclick = (data, formProperty)=>{
    setSelectedData(data);
    setFormType(formProperty)
    setShowForm(true)
  }
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
      field: "department",
      header: "Department",
      body: (rowData) => <>{rowData?.userDetail?.departmentName}</>,
    },
    {
      field: "exam",
      header: "Exam",
      body: (rowData) => (
        <>
          {StatusColor({
            status: rowData?.reportDetail?.statusName ?? "Pending",
            showStatus: true,
          })}
        </>
      ),
    },
    {
      field: "Effectiveness",
      header: "Effectiveness",
      body: (rowData) => (
        <> {data?.durationInHours >= 16 ? 
          StatusColor({
            status: getStatusById(rowData?.effectivenessDetail?.currentRouting?.statusId) ?? "Pending",
            showStatus: true,
            handleOnclick : ()=>handleOnclick(rowData,  {typeId: ActivityType.EFFECTIVENESS, property:"effectivenessDetail"}),
          }): "N/A"}
        </>
      ),
    },
    {
      field: "Report",
      header: "Report",
      body: (rowData) => (
        <>
          {StatusColor({
            status: getStatusById(rowData?.reportDetail?.currentRouting?.statusId) ?? "Pending",
            showStatus: true,
            handleOnclick : ()=>handleOnclick(rowData,  {typeId: ActivityType.REPORT, property:"reportDetail"}),
          })}
        </>
      ),
    },
    {
      field: "Evaluation",
      header: "Evaluation",
      body: (rowData) => (
        <>
          {StatusColor({
            status: rowData?.evaluationDetail?.statusName ?? "Pending",
            showStatus: true,
            handleOnclick : ()=>handleOnclick(rowData, {typeId: ActivityType.EVALUATION, property:"evaluationDetail"}),
          })}
        </>
      ),
    },
    {
      field: "department",
      header: "Remarks",
    },
  ];
  return (
    <>
      {!showForm ? (
        <>
          <SectionHeading
            title="Trainee Pending Reports"
            icon={<i className="pi pi-clock"></i>}
          />
          <CommonTable
            dataTable={formData?.data}
            columnItems={columnItems}
            tableName="Participants"
          />
        </>
      ) : (
        selectedData && (
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
            {selectedData[formType.property]?.id ?<>
            {formType?.typeId === ActivityType.EFFECTIVENESS && 
            <EffectivenessForm
              data={data}
              userData={selectedData?.userDetail}
              formData={selectedData[formType.property]}
              currentRouting={selectedData[formType.property]?.currentRouting}
            />}
            {formType?.typeId === ActivityType.REPORT && 
            <TrainingReportForm
              data={data}
              userData={selectedData?.userDetail}
              defaultValue={selectedData[formType.property]}
              currentRouting={selectedData[formType.property]?.currentRouting}
              auditTrail={selectedData[formType.property]?.auditTrail}
              isSubmitted
            />}
            {formType?.typeId === ActivityType.EVALUATION && 
            <EvaluationForm
              data={data}
              userData={selectedData?.userDetail}
              defaultValue={selectedData[formType.property]}
            />}</>:
            <div className="text-center py-5">No data available</div> }
          </Card>
        )
      )}
    </>
  );
};
PendingView.propTypes = {
  data: proptype.object.isRequired,
  formData: proptype.object.isRequired,
};
export default PendingView;