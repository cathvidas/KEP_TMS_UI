import { SectionHeading } from "../../components/General/Section";
import proptype from "prop-types";
import CommonTable from "../../components/General/CommonTable";
import { useState } from "react";
import { OtherConstant, statusCode, UserTypeValue } from "../../api/constants";
import { Button } from "primereact/button";
import TrainingFormsEmailTemplate from "../../components/email/TrainingFormsEmailTemplate";
import NotFoundPage from "../NotFoundPage";
import { SessionGetRole } from "../../services/sessions";
const PendingView = ({ data, formData, examDetail, oldSystem }) => {
  const [showEmailTemplate, setShowEmailTemplate] = useState(false);
  const getExamSumary = (traineeId) => {
    const exams = examDetail?.filter((item) =>
      item?.traineeExam?.find((o) => o.traineeId === traineeId)
    );
    return examDetail?.length > 0 ? exams?.length === examDetail?.length
      ? "Completed"
      : `${exams?.length}/${examDetail?.length}` : "N/A";
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
            ? rowData?.effectivenessDetail?.id ? "Submitted" :
              "Not yet submitted"
            : "N/A"}
        </>
      ),
    },
    {
      field: "Report",
      header: "Report",
      body: (rowData) => (
        <>{rowData?.reportDetail?.id ? "Submitted" : "Not yet submitted"}</>
      ),
    },
    {
      field: "Evaluation",
      header: "Evaluation",
      body: (rowData) => <>{rowData?.evaluationDetail?.id ? "Submitted" : "Not yet submitted"}</>,
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
  return (
    <>   
    {SessionGetRole() === UserTypeValue.ADMIN ? <>
      {!showEmailTemplate ? (
        <>
          <SectionHeading
            title="Trainee Pending Reports"
            icon={<i className="pi pi-clock"></i>}
          />
          <CommonTable
            headerComponent={!oldSystem && data?.status?.id != statusCode.CLOSED ? <HeaderComponent /> : null}
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
          disableFormLink
        />
      )}{" "}</> : <NotFoundPage/>}
    </>
  );
};
PendingView.propTypes = {
  data: proptype.object.isRequired,
  formData: proptype.object,
  examDetail: proptype.array,
  oldSystem: proptype.bool,
};
export default PendingView;
