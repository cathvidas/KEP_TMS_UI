import { Card, Col, Form, Row } from "react-bootstrap";
import { FormFieldItem } from "./../trainingRequestFormComponents/FormElements";
import AutoCompleteField from "./common/AutoCompleteField";
import proptype from "prop-types"
import { formatDateOnly } from "../../utils/Formatting";

const TrainingReportForm = ({data, userData}) => {
  console.log(userData)
  console.log(data)
  return (
      <Card.Body className="border-top">
        <div className="text-center  pb-3 mb-3">
          <h5 className="m-0">Training Report Form</h5>   
          <small className="text-muted">
           Knowles Electronics Philippines
          </small>
        </div>
        <Form>
          <Row>
              <AutoCompleteField label="Name" value={userData?.data?.fullname} className="col-6" />
              <AutoCompleteField label="BadgeNo" value={userData?.data?.employeeBadge}  />
              <AutoCompleteField label="Position" value={userData?.data?.position} className="col-6" />
              <AutoCompleteField label="Department" value={userData?.data?.departmentName}  />
              <AutoCompleteField label="Training Program Attended" value={data?.trainingProgram?.name}  className="col-12"/>
              <AutoCompleteField label="Training Provider" value={data?.trainingProvider?.name} className="col-12" />
              <AutoCompleteField label="Training Duration" value={`${formatDateOnly(data?.trainingStartDate)} - ${formatDateOnly(data?.trainingEndDate)}`}  className="col-6"/>
              <AutoCompleteField label="Total Training Hours" value={data?.durationInHours}  />
          </Row>
          <br />
          <Row>
            <FormFieldItem
              label="Knowledge/Skills Gained from the Training Program:"
              col={"col-12"}
              FieldComponent={
                <textarea
                  className="form-control"
                  rows={5}
                  placeholder="Start writing here..."
                ></textarea>
              }
            />
          </Row>
          <Row className="g-0 border">
            <Col className="col-md-6">
              <div className="">
                <h6 className="text-center p-2 m-0 theme-bg-light form-label">
                  ACTION PLAN
                </h6>
                <textarea
                  className="w-100 border-0 no-focus px-2"
                  rows={10}
                ></textarea>
              </div>
            </Col>
            <Col className="col-md-6 border-start">
              <div className="">
                <h6 className="text-center p-2 m-0 theme-bg-light form-label">
                  TIMEFRAME
                </h6>
                <textarea
                  className="w-100 border-0 no-focus px-2"
                  rows={10}
                ></textarea>
              </div>
            </Col>
          </Row>
        </Form>
      </Card.Body>
  );
};

TrainingReportForm.propTypes = {
  data: proptype.object,
  userData: proptype.object,
};
export default TrainingReportForm;
