import { SectionHeading } from "../../components/General/Section";
import proptype from "prop-types";
import CommonTable from "../../components/General/CommonTable";
import { useState } from "react";
import { OtherConstant } from "../../api/constants";
import { Button } from "primereact/button";
import TrainingFormsEmailTemplate from "../../components/email/TrainingFormsEmailTemplate";
const PendingView = ({ data, formData, examDetail }) => {
  const [showEmailTemplate, setShowEmailTemplate] = useState(false);
  const getExamSumary = (traineeId) => {
    const exams = examDetail?.filter((item) =>
      item?.traineeExam?.find((o) => o.traineeId === traineeId)
    );
    return exams?.length === examDetail?.length
      ? "Completed"
      : `${exams?.length}/${examDetail?.length}`;
  };
  console.log(examDetail);
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
      field: "Effectiveness",
      header: "Effectiveness",
      body: (rowData) => (
        <>
          {" "}
          {data?.durationInHours >= OtherConstant.EFFECTIVENESS_MINHOUR
            ? rowData?.effectivenessDetail?.currentRouting?.statusId ??
              "Pending"
            : "N/A"}
        </>
      ),
    },
    {
      field: "Report",
      header: "Report",
      body: (rowData) => (
        <>{rowData?.reportDetail?.currentRouting?.statusId ?? "Pending"}</>
      ),
    },
    {
      field: "Evaluation",
      header: "Evaluation",
      body: (rowData) => <>{rowData?.evaluationDetail?.status ?? "Pending"}</>,
    },
    {
      field: "exam",
      header: "Exam",
      body: (rowData) => (
        <>{getExamSumary(rowData?.userDetail?.employeeBadge)}</>
      ),
    },
  ];
  const HeaderComponent = () => {
    return (
      <>
        <Button
          label="Send Follow-up Email"
          icon="pi pi-send"
          type="button"
          size="small"
          className="rounded"
          onClick={() => setShowEmailTemplate(true)}
        />
      </>
    );
  };
  // const get
  return (
    <>
      {!showEmailTemplate ? (
        <>
          <SectionHeading
            title="Trainee Pending Reports"
            icon={<i className="pi pi-clock"></i>}
          />
          <CommonTable
            headerComponent={<HeaderComponent />}
            dataTable={formData?.data}
            columnItems={columnItems}
            dataKey={data?.data?.userDetail?.id}
          />
        </>
      ) : (
        <TrainingFormsEmailTemplate
          examDetail={examDetail}
          userFormData={formData?.data}
          requestData={data}
          onClose={() => setShowEmailTemplate(false)}
        />
      )}{" "}
    </>
  );
};
PendingView.propTypes = {
  data: proptype.object.isRequired,
  formData: proptype.object.isRequired,
  examDetail: proptype.array,
};
export default PendingView;
