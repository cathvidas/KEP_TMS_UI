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
import getTraineeExamDetail from "../../services/common/getTraineeExamDetail";
import ExamDetails from "../../components/Exam/ExamDetails";
import GeneralEmailTemplate from "../../components/email/GeneralEmailTemplate";
const MonitoringReportView = ({
  data,
  reportType,
  tableName,
  hasApprover,
  formData,
  typeId,
  examDetail,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showEmailTemplate, setShowEmailTemplate] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const actionTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-eye"
          text
          className="rounded-circle"
          onClick={() => {
            setSelectedData(
              typeId === ActivityType.EXAM && examDetail
                ? { user: rowData?.userDetail?.employeeBadge, exam: examDetail }
                : rowData
            );
            setShowForm(true);
          }}
          disabled={rowData[reportType]?.id ? false : true}
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
  ];

  const addcolumns = () => {
    if (examDetail) {
      examDetail?.map((item, index) => {
        columnItems.push({
          field: "",
          header: `Exam${index + 1} Score`,
          body: (rowData) => (
            <>
              {getTraineeExamDetail(item, rowData?.userDetail?.employeeBadge)
                ?.submitted
                ? `${
                    getTraineeExamDetail(
                      item?.traineeExam,
                      rowData?.userDetail?.employeeBadge
                    )?.detail[0]?.totalScore
                  }/${item?.examDetail?.questionLimit}`
                : StatusColor({
                    status:
                      getStatusById(
                        rowData[reportType]?.currentRouting?.statusId
                      ) ?? "Pending",
                    showStatus: true,
                  })}
            </>
          ),
        });
      });
    }
    columnItems.push(
      typeId !== ActivityType.EXAM
        ? {
            field: "department",
            header: "Status",
            body: (rowData) => (
              <>
                {typeId === ActivityType.EVALUATION
                  ? rowData[reportType]?.status
                  : StatusColor({
                      status:
                        getStatusById(
                          rowData[reportType]?.currentRouting?.statusId
                        ) ?? "Pending",
                      showStatus: true,
                    })}
              </>
            ),
          }
        : [],
      hasApprover
        ? {
            field: "department",
            header: "Approver",
            body: (rowData) => (
              <>
                {rowData[reportType]?.currentRouting?.assignedDetail
                  ?.fullname ?? "N/A"}
              </>
            ),
          }
        : [],
      {
        field: "department",
        header: "Action",
        body: actionTemplate,
      }
    );
  };
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
  addcolumns();
  return (
    <>
      {!showForm ? (
        <>
          {showEmailTemplate ? (
            <GeneralEmailTemplate
              requestData={data}
              userFormData={formData?.data}
              reportType={reportType}
              typeId={typeId}
              onClose={() => setShowEmailTemplate(false)}
            />
          ) : (
            <>
              <div className="flex justify-content-between">
                {" "}
                <SectionHeading
                  title={`Training ${
                    tableName ? tableName : "Forms"
                  } Monitoring`}
                  icon={<i className="pi pi-clock"></i>}
                />
              </div>

              <CommonTable
                headerComponent={<HeaderComponent />}
                dataTable={formData?.data}
                columnItems={columnItems}
              />
            </>
          )}
        </>
      ) : (
        <>
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
            {examDetail && typeId === ActivityType.EXAM ? (
              <>
                <div className="d-flex flex-column">
                  {selectedData?.exam?.map((item, index) => (
                    <>
                      <ExamDetails
                        traineeExam={
                          getTraineeExamDetail(
                            item?.traineeExam,
                            selectedData?.user
                          )?.detail
                        }
                        examDetail={item?.examDetail}
                        isAdmin
                      />
                      {index < selectedData?.exam?.length - 1 && (
                        <hr className="m-0" />
                      )}
                    </>
                  ))}
                </div>
              </>
            ) : selectedData[reportType]?.id ? (
              <>
                {typeId === ActivityType.EFFECTIVENESS && (
                  <EffectivenessForm
                    data={data}
                    userData={selectedData?.userDetail}
                    formData={selectedData[reportType]}
                    currentRouting={
                      selectedData?.effectivenessDetail?.currentRouting
                    }
                    auditTrail={
                      selectedData?.effectivenessDetail?.auditTrail
                        ? selectedData?.effectivenessDetail?.auditTrail[0]
                        : {}
                    }
                    isAdmin
                  />
                )}
                {typeId === ActivityType.REPORT && (
                  <TrainingReportForm
                    data={data}
                    userData={selectedData?.userDetail}
                    defaultValue={selectedData[reportType]}
                    // currentRouting={{}}
                    isSubmitted
                    isAdmin
                    auditTrail={
                      selectedData?.reportDetail?.auditTrail
                        ? selectedData?.reportDetail?.auditTrail[0]
                        : {}
                    }
                    currentRouting={selectedData?.reportDetail?.currentRouting}
                  />
                )}
                {typeId === ActivityType.EVALUATION && (
                  <EvaluationForm
                    data={data}
                    userData={selectedData?.userDetail}
                    formData={selectedData[reportType]}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-5">No data available</div>
            )}
          </Card>
        </>
      )}{" "}
    </>
  );
};

MonitoringReportView.propTypes = {
  data: proptype.object,
  reportType: proptype.string,
  tableName: proptype.string,
  hasApprover: proptype.bool,
  formData: proptype.object,
  typeId: proptype.number,
  examDetail: proptype.array,
};
export default MonitoringReportView;
