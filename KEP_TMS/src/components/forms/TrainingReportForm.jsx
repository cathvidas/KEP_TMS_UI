import { Card, Col, Form, Row } from "react-bootstrap";
import { FormFieldItem } from "./../trainingRequestFormComponents/FormElements";
import AutoCompleteField from "./common/AutoCompleteField";
import proptype from "prop-types";
import { SessionGetEmployeeId } from "../../services/sessions";
import trainingreportConstant from "../../services/constants/trainingReportConstant";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import {
  actionFailed,
  actionSuccessful,
  confirmAction,
} from "../../services/sweetalert";
import handleResponseAsync from "../../services/handleResponseAsync";
import trainingReportService from "../../services/trainingReportService";
import ErrorTemplate from "../General/ErrorTemplate";
import { formatDateOnly, formatDateTime } from "../../utils/datetime/Formatting";
import StatusColor from "../General/StatusColor";
import getStatusById from "../../utils/status/getStatusById";
import ActivityLog from "../General/ActivityLog";
import activityLogHook from "../../hooks/activityLogHook";

const TrainingReportForm = ({ data, userData , onFinish, defaultValue, isSubmitted, currentRouting, auditTrail}) => {
  const [formData, setFormData] = useState(trainingreportConstant);
  const [errors, setErrors] = useState({});
  const getFormData = {
    ...formData,
    trainingRequestId: data.id,
    traineeBadge: SessionGetEmployeeId()
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(()=>{
    if(defaultValue && isSubmitted){
      setFormData({...defaultValue});
    }
  }, [defaultValue, isSubmitted])
  const handleSubmit = () => {
    const isValid = validateForm();
    if (isValid) {
      confirmAction({
        onConfirm: ()=>handleResponseAsync(()=>
          trainingReportService.createTrainingReport(getFormData),
        (e)=>{actionSuccessful("Training report created successfully", e.message)
          window.location.reload();
        },
         (e)=>actionFailed("Error creating training report", e.message),
         ()=>onFinish()
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
const logs = activityLogHook.useReportsActivityLog(defaultValue, userData);
  return (
    <Card.Body>
      {isSubmitted &&          
      <div className=" flex justify-content-between  mb-2">
            <div>
              Submitted:{" "}
              {formatDateTime(auditTrail?.createdDate)}
            </div>
            <div>
              Status: &nbsp;
              {StatusColor({
                status: getStatusById(currentRouting?.statusId),
                class: "p-1",
                showStatus: true,
              })}
              <b> - {currentRouting?.assignedDetail?.fullname}</b>
            </div>
          </div>
        // <small>Created: {formatDateTime(auditTrail?.createdDate)} {StatusColor({status: getStatusById(formData?.statusId), showStatus: true})}</small>   
      } <div className="text-center  pb-3 mb-3">
        <h5 className="m-0">Training Report Form</h5>
        <small className="text-muted">Knowles Electronics Philippines</small>
      </div>
      <Form>
        <Row>
          <AutoCompleteField
            label="Name"
            value={userData?.fullname}
            className="col-6"
          />
          <AutoCompleteField
            label="BadgeNo"
            value={userData?.employeeBadge}
          />
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
                readOnly={isSubmitted}
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
                readOnly={isSubmitted}
              ></textarea>

           
            </div>
          </Col>
          <Col className="col-md-6 border-start">
            <div className="">
              <h6 className="text-center p-2 m-0 theme-bg-light form-label required"> {errors?.timeframe && (
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
                readOnly={isSubmitted}
              ></textarea>

            </div>
          </Col>
        </Row>  
        <br />     
        {data?.trainingParticipants?.some(x=>x.employeeBadge === SessionGetEmployeeId()) && !defaultValue&&
        <div className="text-end mt-3">
          <Button
            type="button"
            icon="pi pi-eraser"
            label="Reset"
            className="rounded"
            severity="secondary"
            onClick={() => {
              setFormData(trainingreportConstant);
            }}
          />
          <Button
            type="button"
            icon="pi pi-cloud-upload"
            label="Submit Form"
            className="rounded ms-2"
            severity="success"
            onClick={handleSubmit}
          />
        </div>}
      </Form>
      {isSubmitted && 
      <ActivityLog label="Activity Logs" items={logs} isDescending/>}
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
};
export default TrainingReportForm;
