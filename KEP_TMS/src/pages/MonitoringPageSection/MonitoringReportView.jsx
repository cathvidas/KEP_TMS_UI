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
import { ActivityType, UserTypeValue } from "../../api/constants";
import getStatusById from "../../utils/status/getStatusById";
import getTraineeExamDetail from "../../services/common/getTraineeExamDetail";
import ExamDetails from "../../components/Exam/ExamDetails";
import GeneralEmailTemplate from "../../components/email/GeneralEmailTemplate";
import { SessionGetRole } from "../../services/sessions";
const MonitoringReportView = ({
  data,
  reportType,
  tableName,
  hasApprover,
  formData,
  typeId,
  examDetail,
  onRefresh
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
            setSelectedData(rowData
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
  const examColumnTemplate = (rowData, item) => {
    return    <>
    {getTraineeExamDetail(item, rowData?.userDetail?.employeeBadge)
      ?.submitted
      ? `${
          getTraineeExamDetail(
            item,
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
  }
  const examActionTemplate = (rowData) => {
    console.log(rowData)
    let submitted = false;
    examDetail?.map((item) => {
      if(!submitted) {
      submitted = getTraineeExamDetail(item, rowData?.userDetail?.employeeBadge)?.submitted;}
    });
    return (
      <>
        <Button
        text
          icon="pi pi-eye"
          className="rounded "
          onClick={() => {
            setSelectedData({ userDetail: rowData?.userDetail, exam: examDetail }
            );
            setShowForm(true);
          }}
          disabled={!submitted}
        />
      </>
    );
  }
  const addcolumns = () => {
    if (examDetail) {
      examDetail?.map((item, index) => {
        columnItems.push({
          field: "",
          header: `Exam${index + 1} Score`,
          body: (rowData) => (
            <>
              {examColumnTemplate(rowData, item)}
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
                  ? rowData[reportType]?.status ?? "Not yet submitted"
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
            header: "Current Approver",
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
        body: typeId === ActivityType.EXAM ? examActionTemplate : actionTemplate,
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
              onRefresh={onRefresh}
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
                headerComponent={SessionGetRole() === UserTypeValue.ADMIN ?<HeaderComponent /> : null}
                dataTable={formData?.data}
                columnItems={columnItems}
              />
            </>
          )}
        </>
      ) : (
        <>
          <Card>
            <Card.Header className="flex ">
              {selectedData?.userDetail?.fullname && <h5 className="m-0">{selectedData?.userDetail?.fullname}</h5>}
              <Button
                type="button"
                icon="pi pi-times"
                size="small"
                text
                className="rounded-circle ms-auto"
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
                            item,
                            selectedData?.userDetail?.employeeBadge
                          )?.detail
                        }
                        refreshData={onRefresh}
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
                        ? selectedData?.effectivenessDetail?.auditTrail
                        : []
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
  onRefresh: proptype.func,
};
export default MonitoringReportView;
