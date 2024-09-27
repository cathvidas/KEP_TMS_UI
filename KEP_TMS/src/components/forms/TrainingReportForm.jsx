import { Card, Col, Form, Row } from "react-bootstrap";
import { FormFieldItem } from "./../trainingRequestFormComponents/FormElements";
import AutoCompleteField from "./common/AutoCompleteField";

const TrainingReportForm = ({data}) => {
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
              <AutoCompleteField label="Name" value="" className="col-6" />
              <AutoCompleteField label="BadgeNo" value="" />
              <AutoCompleteField label="Position" value=""className="col-6" />
              <AutoCompleteField label="Department" value="" />
              <AutoCompleteField label="Training Program Attended" value="" className="col-12"/>
              <AutoCompleteField label="Training Provider" value=""className="col-12" />
              <AutoCompleteField label="Training Duration" value="" className="col-6"/>
              <AutoCompleteField label="Total Training Hours" value="" />
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

TrainingReportForm.propTypes = {};
export default TrainingReportForm;
