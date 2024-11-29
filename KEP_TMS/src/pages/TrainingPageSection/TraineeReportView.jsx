import { useRef, useState } from "react";
import TrainingReportForm from "../../components/forms/TrainingReportForm";
import { Card } from "react-bootstrap";
import EvaluationForm from "../../components/forms/EvaluationForm";
import proptype from "prop-types";
import EffectivenessForm from "../../components/forms/EffectivenessForm";
import { SessionGetEmployeeId } from "../../services/sessions";
import userHook from "../../hooks/userHook";
import { ActivityType, OtherConstant, statusCode } from "../../api/constants";
import effectivenessHook from "../../hooks/effectivenessHook";
import trainingReportHook from "../../hooks/trainingReportHook";
import evaluationHook from "../../hooks/evaluationHook";
import { Toast } from "primereact/toast";
import SkeletonForm from "../../components/Skeleton/SkeletonForm";
import trainingDetailsService from "../../services/common/trainingDetailsService";
const TraineeReportView = ({ data, refreshData, isTrainee, activityType }) => {
  const getUserDetail = () => {
    return data?.trainingParticipants?.find(
      (item) => item.employeeBadge === SessionGetEmployeeId()
    );
  };
  const toast = useRef(null);
  const userData = userHook.useUserById(SessionGetEmployeeId());
  const [reportsId] = useState(getUserDetail());
  const effectiveness = reportsId?.effectivenessId
    ? effectivenessHook.useEffectivenessById(reportsId.effectivenessId)
    : {};
  const report = reportsId?.reportId
    ? trainingReportHook.useTrainingReportById(reportsId.reportId)
    : {};
  const evaluation = reportsId?.evaluationId
    ? evaluationHook.useEvaluationById(reportsId.evaluationId)
    : {};
  const handleOnFinish = () => {
    setTimeout(() => {
      refreshData();
    }, 1000);
  };
  return data?.durationInHours >= OtherConstant.EFFECTIVENESS_MINHOUR ||
    (data?.durationInHours < OtherConstant.EFFECTIVENESS_MINHOUR &&
      trainingDetailsService.checkIfTrainingEndsAlready(data)) ? (
    <div className="w-100 oveflow-hidden">
      {isTrainee && (
        <>
          <Card className="p overflow-hidden">
            <Card.Body className="mt-0">
              {activityType === ActivityType.EFFECTIVENESS &&
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
              {trainingDetailsService.checkIfTrainingEndsAlready(data) &&
              (data?.status?.id === statusCode.APPROVED ||
                data?.status?.id === statusCode.CLOSED) &&
                 (
                activityType === ActivityType.REPORT ? (
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
                ) : activityType === ActivityType.EVALUATION ? (
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
                ) : (
                  <></>
                )
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
  activityType: proptype.number,
};
export default TraineeReportView;
