import { Card, Col, Form, Row, Table } from "react-bootstrap";
import AutoCompleteField from "./common/AutoCompleteField";
import proptype from "prop-types"
import { formatDateOnly } from "../../utils/Formatting";

const EffectivenessForm = ({data, userData}) => {
  const getFacilitators = () => {
    let facilitators = "";
    data?.trainingFacilitators?.map((x) => {
      facilitators += `${x.fullname}  `;
    });
    return facilitators;
  };
  return (
    <>
      <Card.Body className="border-top ">
        <div className="text-center  pb-3 mb-3 ">
          <h5 className="m-0">TRAINING EFFECTIVENESS MONITORING FORM</h5>
          <small className="text-muted">Knowles Electronics Philippines</small>
        </div>
        <Form>
          <Row>
            <AutoCompleteField
              label="Name of Employee"
              value={userData?.data?.fullname} 
              className="col-6"
            />
            <AutoCompleteField label="Badge No" value={userData?.data?.employeeBadge}  />
            <AutoCompleteField label="Position" value={userData?.data?.position} className="col-6" />
            <AutoCompleteField label="Department" value={userData?.data?.departmentName}/>
            <AutoCompleteField
              label="Training / Program"
              value={data?.trainingProgram?.name}
              className="col-12"
            />
            <AutoCompleteField
              label="Facilitator/s"
              value={getFacilitators()}
              className="col-12"
            />
            <AutoCompleteField
              label="Training Date/s"
              value={`${formatDateOnly(data?.trainingStartDate)} - ${formatDateOnly(data?.trainingEndDate)}`}
              className="col-6"
            />
            <AutoCompleteField label="Total Training Hours" value={data?.durationInHours} />
            <AutoCompleteField
              label="Training Category"
              value={data?.trainingCategory?.name}
              className="col-12"
            />
          </Row>
          <br />
          <small>
            <b>
              Part I and II to be filled out by the trainee with the concurrence
              of the immediate manager BEFORE the training
            </b>
          </small>
          <br />
          <label>
            <b>Rating Scale:</b>{" "}
          </label>
          <Form.Group>
            <b>
              I. What are the specific performance characteristics that you
              would like to develop by attending this training?
            </b>
            <Table className="table-bordered">
              <thead>
                <tr>
                  <th
                    colSpan={2}
                    className="theme-bg-light text-muted text-center"
                  >
                    Performance Characteristics
                  </th>
                  <th className="theme-bg-light text-muted text-center">
                    Self-assessment/ Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <textarea className="no-focus w-100 border-0"></textarea>
                  </td>
                  <td>
                    <textarea className="no-focus w-100 border-0"></textarea>
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>
                    <textarea className="no-focus w-100 border-0"></textarea>
                  </td>
                  <td>
                    <textarea className="no-focus w-100 border-0"></textarea>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>
                    <textarea className="no-focus w-100 border-0"></textarea>
                  </td>
                  <td>
                    <textarea className="no-focus w-100 border-0"></textarea>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Form.Group>
          <Form.Group>
            <b>
              II. List the Projects/Task/Assignment the trainee is currently
              undertaking or will be undertaking whre the Knowledge and skills
              developed from training will be applied.
            </b>
            <Row>
              <Col className={`d-flex gap-2 align-items-end`}>
                <label className="fw-bold" style={{ fontSize: "0.8rem" }}>
                  Target Date of Evaluation{" "}
                  <i> (specify date - 6 months after the training):</i>
                </label>
                <span className="flex-grow-1 border-0 border-bottom"></span>
              </Col>
              <Col className={`d-flex gap-2 align-items-end`}>
                <label className="fw-bold" style={{ fontSize: "0.8rem" }}>
                  Evaluator
                </label>
                <span className="flex-grow-1 border-0 border-bottom"></span>
              </Col>
            </Row>
            <Table className="mt-2 table-bordered">
              <thead>
                <tr>
                  <th
                    colSpan={2}
                    className="theme-bg-light text-muted text-center"
                  >
                    Project / Task / Assignment
                  </th>
                  <td className="theme-bg-light text-muted text-center">
                    <b> Performance Before Training </b> &#x28;to be filled up
                    before the training&#x29;
                  </td>
                  <td className="theme-bg-light text-muted text-center">
                    <b> Projected Performance </b> &#x28;to be filled up before
                    the training&#x29;
                  </td>
                  <td className="theme-bg-light text-muted text-center">
                    <b> Actual Performance </b> &#x28;to be filled up after the
                    training&#x29;
                  </td>
                  <td className="theme-bg-light text-muted text-center">
                    <b>
                      {" "}
                      Actual Performance evaluated by the immediate manager &
                      date
                    </b>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <textarea className="no-focus w-100 border-0"></textarea>
                  </td>
                  <td>
                    <textarea className="no-focus w-100 border-0"></textarea>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>
                    <textarea className="no-focus w-100 border-0"></textarea>
                  </td>
                  <td>
                    <textarea className="no-focus w-100 border-0"></textarea>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>
                    <textarea className="no-focus w-100 border-0"></textarea>
                  </td>
                  <td>
                    <textarea className="no-focus w-100 border-0"></textarea>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </Form.Group>
          <Form.Group>  
            <b>
            III. Comments / Remarks
            </b>
            <i> &#x28;to be filled up after the training&#x29; :</i>
            <textarea className="form-control" rows={3}></textarea>
          </Form.Group>
        </Form>
      </Card.Body>
    </>
  );
};
EffectivenessForm.propTypes = {
  data: proptype.object,
  userData: proptype.object,
};
export default EffectivenessForm;
