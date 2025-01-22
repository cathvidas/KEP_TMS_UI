import { Col, Form, Modal, Row } from "react-bootstrap"
import Select from "react-select";
import proptype from "prop-types"
import { FormFieldItem } from "../../trainingRequestFormComponents/FormElements";
import ExportBtn from "../../General/ExportBtn";
import { useState } from "react";
import { Button } from "primereact/button";
import { statusCode } from "../../../api/constants";

const ExportDataForm = ()=>{
    const [options, setOptions] = useState({startDate: "", endDate: "", status: ""})
    const [showForm, setShowForm] = useState(false)
    const statusOption = [
      { value: statusCode.APPROVED, label: "Approved" },
      { value: statusCode.FORAPPROVAL, label: "For Approval" },
      { value: statusCode.DISAPPROVED, label: "Disapproved" },
      { value: statusCode.SUBMITTED, label: "Submitted" },
      { value: statusCode.CLOSED, label: "Closed" },
      { value: statusCode.INACTIVE, label: "Cancelled" },
      { value: null, label: "All" },
    ];
    const {data, loading} = "";
    return (
      <>
        <Button
          text
          icon="pi pi-download"
          type="button"
          onClick={() => setShowForm(true)}
        />
        <Modal show={showForm} onHide={() => setShowForm(false)} size={"md"}>
          <Modal.Header className="border-0" closeButton>
            <Modal.Title className={`h5 theme-color`}>Export Data</Modal.Title>
          </Modal.Header>
          <Form
            // className={validated && "was-validated"}
            noValidate
          >
            <Modal.Body className="py-0">
              <Row className="">
                <Col className="col-6">
                  <Form.Label className="fw-bold">Start Date</Form.Label>
                  <Form.Control type="date" />
                </Col>
                <Col className="col-6">
                  <Form.Label className="fw-bold">End Date</Form.Label>
                  <Form.Control type="date" />
                </Col>
                <Col className="col-12 mt-2">
                  <Form.Label className="fw-bold">Request Status</Form.Label> 
                  <Select
                    // isMulti
                    // onMenuScrollToBottom={() =>
                    //   setPaginatorConfig((prev) => ({
                    //     ...prev,
                    //     rows: prev.rows + 10,
                    //   }))
                    // }
                    // onInputChange={(e) =>
                    //   setPaginatorConfig((prev) => ({ ...prev, value: e }))
                    // }
                    // isLoading={trainingRequests?.loading}
                    options={statusOption}
                    // value={selectedItem}
                    // onChange={setSelectedItem}
                  />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer className="border-0">
              <ExportBtn data={data?.results} />
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
}
ExportDataForm.propTypes = {
    handleShow: proptype.bool,
    handleClose: proptype.func,
}
export default ExportDataForm;