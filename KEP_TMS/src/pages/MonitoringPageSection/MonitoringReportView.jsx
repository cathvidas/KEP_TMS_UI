import { Button } from "primereact/button";
import CommonTable from "../../components/General/CommonTable";
import { SectionHeading } from "../../components/General/Section";
import StatusColor from "../../components/General/StatusColor";
import proptype from "prop-types";
import { useEffect, useState } from "react";
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
import SkeletonDataTable from "../../components/Skeleton/SkeletonDataTable";
import effectivenessHook from "../../hooks/effectivenessHook";
import trainingReportHook from "../../hooks/trainingReportHook";
import evaluationHook from "../../hooks/evaluationHook";
const MonitoringReportView = ({
  data,
  reportType,
  tableName,
  hasApprover,
  formData,
  typeId,
  examDetail,
  onRefresh,
  oldSystem,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showEmailTemplate, setShowEmailTemplate] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [selectedFormData, setSelectedFormData] = useState({});
  const queuedFormData = typeId === ActivityType.EFFECTIVENESS ? effectivenessHook.useEffectivenessById(selectedData?.effectivenessDetail?.id):
   typeId === ActivityType.REPORT ? trainingReportHook.useTrainingReportById(selectedData?.reportDetail?.id) : 
   typeId === ActivityType.EVALUATION? evaluationHook.useEvaluationById(selectedData?.evaluationDetail?.id) : null;
   useEffect(()=>{
    if(oldSystem){
      setSelectedFormData(selectedData[reportType])
    }else{
    setSelectedFormData(queuedFormData?.data)}
   }, [selectedData, oldSystem, queuedFormData, reportType])
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
          disabled={!rowData[reportType]?.id}
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
      oldSystem ? {
        field: "exam",
        header: "Status",
        body: (rowData) => <>{rowData[reportType]?.statusName ??rowData[reportType]?.status ?? "N/A"}</>
      } :
      (typeId !== ActivityType.EXAM && !oldSystem)
        ? {
            field: "department",
            header: "Status",
            body: (rowData) => (
              <>
                {typeId === ActivityType.EVALUATION
                  ? rowData[reportType]?.status ?? "Not yet submitted"
                  : StatusColor({
                      status: rowData[reportType]?.statusName ?? rowData[reportType]?.status ??
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
                {rowData[reportType]?.currentApproverName ?? rowData[reportType]?.currentApprover ?? rowData[reportType]?.currentRouting?.assignedDetail
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
                {formData?.loading ? <SkeletonDataTable/> :
              <CommonTable
                headerComponent={
                  SessionGetRole() === UserTypeValue.ADMIN && !oldSystem ? (
                    <HeaderComponent />
                  ) : null
                }
                dataTable={formData?.data}
                columnItems={columnItems}
              />}
            </>
          )}
        </>
      ) : (
        <>
          <Card>
            <Card.Header className="flex ">
              {selectedData?.userDetail?.fullname && (
                <h5 className="m-0">{selectedData?.userDetail?.fullname}</h5>
              )}
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
                    onFinish={onRefresh}
                    data={data}
                    userData={selectedData?.userDetail}
                    formData={selectedFormData}
                    currentRouting={
                      selectedFormData?.currentRouting
                    }
                    auditTrail={
                      selectedFormData?.auditTrail
                        ? selectedFormData?.auditTrail
                        : []
                    }
                    isAdmin
                    oldSystem={oldSystem}
                  />
                )}
                {typeId === ActivityType.REPORT && (
                  <TrainingReportForm
                    onFinish={onRefresh}
                    data={data}
                    userData={selectedData?.userDetail}
                    defaultValue={selectedFormData}
                    isSubmitted
                    isAdmin
                    oldSystem={oldSystem}
                    auditTrail={
                      selectedFormData?.auditTrail
                        ? selectedFormData?.auditTrail[0]
                        : {}
                    }
                    currentRouting={selectedFormData?.currentRouting}
                  />
                )}
                {typeId === ActivityType.EVALUATION && (
                  <EvaluationForm
                    onFinish={onRefresh}
                    data={data}
                    userData={selectedData?.userDetail}
                    defaultValue={selectedData?.evaluationDetail}
                    oldSystem={oldSystem}
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
  oldSystem: proptype.bool,
};
export default MonitoringReportView;
