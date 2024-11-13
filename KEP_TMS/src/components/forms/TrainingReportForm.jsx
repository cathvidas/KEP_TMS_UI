import { Card, Col, Form, Row } from "react-bootstrap";
import { FormFieldItem } from "./../trainingRequestFormComponents/FormElements";
import AutoCompleteField from "./common/AutoCompleteField";
import proptype from "prop-types";
import { SessionGetEmployeeId } from "../../services/sessions";
import trainingreportConstant from "../../services/constants/trainingReportConstant";
import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import {
  actionFailed,
  actionSuccessful,
  confirmAction,
} from "../../services/sweetalert";
import handleResponseAsync from "../../services/handleResponseAsync";
import trainingReportService from "../../services/trainingReportService";
import ErrorTemplate from "../General/ErrorTemplate";
import {
  formatDateOnly,
  formatDateTime,
} from "../../utils/datetime/Formatting";
import getStatusById from "../../utils/status/getStatusById";
import { ActivityType, statusCode } from "../../api/constants";
import getStatusCode from "../../utils/status/getStatusCode";
import handleGeneratePdf from "../../services/common/handleGeneratePdf";
import ActivityList from "../List/ActivityList";
import ApproverList from "../List/ApproversList";
import mappingHook from "../../hooks/mappingHook";
import ActivityStatus from "../General/ActivityStatus";

const TrainingReportForm = ({
  data,
  userData,
  onFinish,
  defaultValue,
  isSubmitted,
  currentRouting,
  auditTrail,
  isAdmin,
}) => {
  const [formData, setFormData] = useState(trainingreportConstant);
  const [errors, setErrors] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const getFormData = {
    ...formData,
    trainingRequestId: data.id,
    traineeBadge: SessionGetEmployeeId(),
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(defaultValue);
  useEffect(() => {
    if (defaultValue) {
      const updatedData = {
        id: defaultValue?.id,
        trainingTakeaways: defaultValue?.trainingTakeaways,
        actionPlan: defaultValue.actionPlan,
        timeframe: defaultValue.timeframe,
        statusId: getStatusCode(defaultValue.status),
        activityRemarks: defaultValue.activityRemarks,
      };
      setFormData({ ...updatedData });
      setIsUpdate(
        defaultValue?.status === getStatusById(statusCode.DISAPPROVED)
      );
      setShowLogs(true);
    }
  }, [defaultValue, isSubmitted]);

  const handleSubmit = () => {
    const isValid = validateForm();
    if (isValid) {
      confirmAction({
        showLoaderOnConfirm: true,
        title: isUpdate ? "Update Report" : "Submit Report",
        onConfirm: () =>
          handleResponseAsync(
            () =>
              isUpdate
                ? trainingReportService.updateTrainingReport({
                    ...getFormData,
                    updatedBy: SessionGetEmployeeId(),
                  })
                : trainingReportService.createTrainingReport(getFormData),
            (e) => {
              actionSuccessful("Success", e.message);
              onFinish();
            },
            (e) =>
              actionFailed(
                `Error ${isUpdate ? "updating" : "submitting"} training report`,
                e.message
              )
          ),
      });
    }
  };
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;
    if (!formData.trainingTakeaways) {
      formErrors.trainingTakeaways = "This field is required";
      isValid = false;
    }
    if (!formData.actionPlan) {
      formErrors.actionPlan = "This field is required";
      isValid = false;
    }
    if (!formData.timeframe) {
      formErrors.timeframe = "This field is required";
      isValid = false;
    }
    setErrors(formErrors);
    return isValid;
  };
  const logs = mappingHook.useMappedActivityLogs(defaultValue, userData);
  const reportTemplateRef = useRef();
  return (
    <Card.Body>
      {
        isSubmitted && (
          <div className=" flex justify-content-between  mb-2">
            <div>Submitted: {formatDateTime(auditTrail?.createdDate)}</div>
            <div>
              Status: &nbsp;
              <ActivityStatus status={currentRouting?.statusId} /> -{" "}
              {currentRouting?.assignedDetail?.fullname}
            </div>
          </div>
        )
        // <small>Created: {formatDateTime(auditTrail?.createdDate)} {StatusColor({status: getStatusById(formData?.statusId), showStatus: true})}</small>
      }{" "}
      <Form ref={reportTemplateRef}>
        <div className="text-center  pb-3 mb-3">
          <h5 className="m-0">Training Report Form</h5>
          <small className="text-muted">Knowles Electronics Philippines</small>
        </div>
        <Row>
          <AutoCompleteField
            label="Name"
            value={userData?.fullname}
            className="col-6"
          />
          <AutoCompleteField label="BadgeNo" value={userData?.employeeBadge} />
          <AutoCompleteField
            label="Position"
            value={userData?.position}
            className="col-6"
          />
          <AutoCompleteField
            label="Department"
            value={userData?.departmentName}
          />
          <AutoCompleteField
            label="Training Program Attended"
            value={data?.trainingProgram?.name}
            className="col-12"
          />
          <AutoCompleteField
            label="Training Provider"
            value={data?.trainingProvider?.name}
            className="col-12"
          />
          <AutoCompleteField
            label="Training Duration"
            value={`${formatDateOnly(
              data?.trainingStartDate
            )} - ${formatDateOnly(data?.trainingEndDate)}`}
            className="col-6"
          />
          <AutoCompleteField
            label="Total Training Hours"
            value={data?.durationInHours}
          />
        </Row>
        <br />
        <Row>
          <FormFieldItem
            required
            label="Knowledge/Skills Gained from the Training Program:"
            col={"col-12"}
            error={errors?.trainingTakeaways}
            FieldComponent={
              <textarea
                className="form-control"
                rows={5}
                placeholder="Start writing here..."
                name="trainingTakeaways"
                value={formData?.trainingTakeaways ?? ""}
                onChange={handleOnChange}
                readOnly={isSubmitted && !isUpdate}
              ></textarea>
            }
          />
        </Row>
        <Row className="g-0 border">
          <Col className="col-md-6">
            <div className="">
              <h6 className="text-center p-2 m-0 theme-bg-light form-label required">
                {errors?.actionPlan && (
                  <ErrorTemplate message={errors?.actionPlan} />
                )}
                ACTION PLAN
              </h6>
              <textarea
                className="w-100 border-0 no-focus px-2"
                rows={10}
                name="actionPlan"
                value={formData?.actionPlan ?? ""}
                onChange={handleOnChange}
                readOnly={isSubmitted && !isUpdate}
              ></textarea>
            </div>
          </Col>
          <Col className="col-md-6 border-start">
            <div className="">
              <h6 className="text-center p-2 m-0 theme-bg-light form-label required">
                {" "}
                {errors?.timeframe && (
                  <ErrorTemplate message={errors?.timeframe} />
                )}
                TIMEFRAME
              </h6>
              <textarea
                className="w-100 border-0 no-focus px-2"
                rows={10}
                name="timeframe"
                value={formData?.timeframe ?? ""}
                onChange={handleOnChange}
                readOnly={isSubmitted && !isUpdate}
              ></textarea>
            </div>
          </Col>
        </Row>
      </Form>
      <br />
      <div className="flex">
        {(data?.trainingParticipants?.some(
          (x) => x.employeeBadge === SessionGetEmployeeId()
        ) ||
          isAdmin) &&
          isSubmitted && (
            <>
              <Button
                type="button"
                label={`${showLogs ? "Hide" : "Show"} Activities`}
                icon={`${showLogs ? "pi pi-eye-slash" : "pi pi-eye"}`}
                className="rounded"
                text
                onClick={() => setShowLogs(!showLogs)}
              />
              <Button
                type="button"
                label="Download"
                icon="pi pi-download"
                className="rounded me-auto"
                text
                severity="help"
                onClick={() => handleGeneratePdf(reportTemplateRef.current)}
              />
            </>
          )}
        {data?.trainingParticipants?.some(
          (x) => x.employeeBadge === SessionGetEmployeeId()
        ) &&
          (!defaultValue || isUpdate) && (
            <>
              <Button
                type="button"
                icon="pi pi-eraser"
                label="Reset"
                className="rounded ms-auto"
                severity="secondary"
                onClick={() => {
                  setFormData(trainingreportConstant);
                }}
              />
              <Button
                type="button"
                icon={isUpdate ? "pi pi-pencil" : "pi pi-cloud-upload"}
                label={isUpdate ? "Update Form" : "Submit Form"}
                className="rounded ms-2"
                severity="success"
                onClick={handleSubmit}
              />
            </>
          )}
      </div>
      {isSubmitted && showLogs && (
        <>
          <hr />
          <h6 className="theme-color" style={{ fontWeight: 600 }}>
            Routes
          </h6>
          <ApproverList
            data={defaultValue}
            activityTitle="Training Report"
            activityType={ActivityType.REPORT}
          />
          <hr />
          <ActivityList data={logs} label={"Activities"} />
        </>
      )}
    </Card.Body>
  );
};

TrainingReportForm.propTypes = {
  data: proptype.object,
  userData: proptype.object,
  onFinish: proptype.func,
  defaultValue: proptype.object,
  isSubmitted: proptype.bool,
  currentRouting: proptype.object,
  auditTrail: proptype.object,
  isAdmin: proptype.bool,
};
export default TrainingReportForm;
