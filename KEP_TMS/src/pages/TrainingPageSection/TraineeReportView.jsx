import { SectionHeading } from "../../components/General/Section";
import { useEffect, useRef, useState } from "react";
import TrainingReportForm from "../../components/forms/TrainingReportForm";
import { Card } from "react-bootstrap";
import EvaluationForm from "../../components/forms/EvaluationForm";
import proptype from "prop-types";
import EffectivenessForm from "../../components/forms/EffectivenessForm";
import { SessionGetEmployeeId } from "../../services/sessions";
import userHook from "../../hooks/userHook";
import { OtherConstant, statusCode } from "../../api/constants";
import effectivenessHook from "../../hooks/effectivenessHook";
import trainingReportHook from "../../hooks/trainingReportHook";
import evaluationHook from "../../hooks/evaluationHook";
import { Toast } from "primereact/toast";
import { TabMenu } from "primereact/tabmenu";
import SkeletonForm from "../../components/Skeleton/SkeletonForm";
import getStatusById from "../../utils/status/getStatusById";
import trainingDetailsService from "../../services/common/trainingDetailsService";
const TraineeReportView = ({ data, refreshData, isTrainee }) => {
  const getUserDetail = () => {
    return data?.trainingParticipants?.find(
      (item) => item.employeeBadge === SessionGetEmployeeId()
    );
  };
  const toast = useRef(null);
  const userData = userHook.useUserById(SessionGetEmployeeId());
  const [reportsId, setReportsId] = useState(getUserDetail());
  const effectiveness = reportsId?.effectivenessId
    ? effectivenessHook.useEffectivenessById(reportsId.effectivenessId)
    : {};
  const report = reportsId?.reportId
    ? trainingReportHook.useTrainingReportById(reportsId.reportId)
    : {};
  const evaluation = reportsId?.evaluationId
    ? evaluationHook.useEvaluationById(reportsId.evaluationId)
    : {};
  const [formIndex, setFormIndex] = useState(0);
  const [reportStatus, setReportStatus] = useState({
    show: false,
    statusId: 0,
    summary: "s",
    detail: "sh",
    severity: "error",
  });
  const showSticky = () => {
    if (reportStatus.show) {
      toast.current?.clear();
      toast.current?.show({
        severity: reportStatus?.severity,
        summary: reportStatus?.summary,
        detail: reportStatus?.detail,
        sticky: true,
        content: reportStatus?.content,
      });
    }
  };
  const handleOnFinish = () => {
    setTimeout(() => {
      refreshData();
    }, 1000);
  };
  useEffect(() => {
    if (
      data?.durationInHours < OtherConstant.EFFECTIVENESS_MINHOUR &&
      formIndex === 0
    ) {
      setFormIndex(1);
    }
  }, [data]);
  useEffect(() => {
    if (formIndex === 0) {
      // setReportStatus({
      //   show: true,
      //   statusId: statusCode.PUBLISHED,
      //   summary: "Effectiveness Form Submitted Successfully",
      //   detail: "Effectiveness Form submitted successfully",
      //   severity: "success",
      // });
    } else if (formIndex === 1) {
      // setReportStatus({
      //   show: true,
      //   statusId: statusCode.PUBLISHED,
      //   summary: "Training Report Submitted Successfully",
      //   detail: "Training Report submitted successfully",
      //   severity: "success",
      // });
    } else if (formIndex === 2) {
      // setReportStatus({
      //   show: true,
      //   statusId: statusCode.SUBMITTED,
      //   summary: "Training Evaluation Submitted Successfully",
      //   detail: "Training Report submitted successfully",
      //   severity: "success",
      // });
    }
  }, [formIndex]);
  const TabMenuItemTemplate = (item, itemIndex) => {
    const activeItem = formIndex === itemIndex;
    return (
      <>
        {!item.hide && (
          <a
            href="#"
            role="menuitem"
            aria-label={item.label}
            tabIndex="0"
            className="p-menuitem-link"
            data-pc-section="action"
            onClick={() => setFormIndex(itemIndex)}
          >
            {item.icon && (
              <span
                className={`p-menuitem-icon ${item.icon} text-${
                  activeItem && item.severity
                }`}
                data-pc-section="icon"
                style={{
                  color: activeItem
                    ? item.color
                      ? item.color
                      : "#2196f3"
                    : "",
                }}
              ></span>
            )}
            <span
              className={`p-menuitem-text text-${activeItem && item.severity}`}
              data-pc-section="label"
              style={{
                color: activeItem ? (item.color ? item.color : "#2196f3") : "",
              }}
            >
              {item.label}
            </span>
          </a>
        )}
      </>
    );
  };
  const items = [
    {
      label: "Effectiveness Form",
      icon:
        effectiveness?.data &&
        effectiveness?.data?.statusName ===
          getStatusById(statusCode.DISAPPROVED)
          ? "pi pi-times-circle"
          : "pi pi-check-circle",
      severity:
        effectiveness?.data &&
        effectiveness?.data?.statusName ===
          getStatusById(statusCode.DISAPPROVED)
          ? "danger"
          : effectiveness?.data?.statusName ===
              getStatusById(statusCode.APPROVED) && "success",
      template: (item) => TabMenuItemTemplate(item, 0),
      hide: data?.durationInHours < OtherConstant.EFFECTIVENESS_MINHOUR,
    },
    {
      label: "Training Report",
      icon: report?.data && "pi pi-check-circle",
      severity: evaluation?.data && "success",
      template: (item) => TabMenuItemTemplate(item, 1),
      // disabled: ,
      hide: data?.status?.id !== statusCode.PUBLISHED || !trainingDetailsService.checkIfTrainingEndsAlready(data),
    },
    {
      label: "Evaluation Form",
      icon: evaluation?.data && "pi pi-check-circle",
      severity: evaluation?.data && "success",
      template: (item) => TabMenuItemTemplate(item, 2),
      hide: data?.status?.id !== statusCode.PUBLISHED || !trainingDetailsService.checkIfTrainingEndsAlready(data),
    },
  ];
  return data?.durationInHours >= OtherConstant.EFFECTIVENESS_MINHOUR ||
    (data?.durationInHours < OtherConstant.EFFECTIVENESS_MINHOUR &&
      trainingDetailsService.checkIfTrainingEndsAlready(data)) ? (
    <div className="w-100 oveflow-hidden">
      {isTrainee && (
        <>
          {showSticky()}
          <SectionHeading title="Trainee Report" />
          <Card className="p overflow-hidden">
            <Card.Body className="mt-0">
              <TabMenu
                model={items}
                className="custom-link"
                activeIndex={formIndex}
                onTabChange={(e) => setFormIndex(e.index)}
              />
              {formIndex === 0 &&
                data?.durationInHours >=
                  OtherConstant.EFFECTIVENESS_MINHOUR && (
                  <>
                    {effectiveness?.loading || userData?.loading ? (
                      <SkeletonForm />
                    ) : (
                      <EffectivenessForm
                        data={data}
                        userData={userData?.data}
                        formData={effectiveness?.data}
                        onFinish={handleOnFinish}
                        currentRouting={effectiveness?.data?.currentRouting}
                        auditTrail={
                          effectiveness?.data?.auditTrail?.length > 0 &&
                          effectiveness?.data?.auditTrail
                        }
                      />
                    )}
                  </>
                )}
              {formIndex === 1 && data?.status?.id === statusCode.PUBLISHED && (
                <>
                  {report?.loading || userData?.loading ? (
                    <SkeletonForm />
                  ) : (
                    <TrainingReportForm
                      data={data}
                      userData={userData?.data}
                      defaultValue={report?.data ?? null}
                      onFinish={handleOnFinish}
                      isSubmitted={report?.data ? true : false}
                      currentRouting={report?.data?.currentRouting}
                      auditTrail={
                        report?.data?.auditTrail?.length > 0 &&
                        report?.data?.auditTrail[0]
                      }
                    />
                  )}
                </>
              )}
              {formIndex === 2 && data?.status?.id === statusCode.PUBLISHED && (
                <>
                  {evaluation?.loading || userData?.loading ? (
                    <SkeletonForm />
                  ) : (
                    <EvaluationForm
                      data={data}
                      userData={userData?.data}
                      onFinish={handleOnFinish}
                      defaultValue={evaluation?.data}
                    />
                  )}
                </>
              )}
            </Card.Body>
          </Card>
          <Toast ref={toast} position="bottom-center" className="z-1" />
        </>
      )}
    </div>
  ) : (
    <div className="d-flex justify-content-center align-items-center h-100 h1 opacity-50 text-muted">
      No Details Available
    </div>
  );
};
TraineeReportView.propTypes = {
  data: proptype.object,
  refreshData: proptype.func,
  isTrainee: proptype.bool,
};
export default TraineeReportView;
