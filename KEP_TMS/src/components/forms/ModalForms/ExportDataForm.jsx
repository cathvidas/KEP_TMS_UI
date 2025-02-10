import { Col, Form, Modal, Row } from "react-bootstrap"
import Select from "react-select";
import proptype from "prop-types"
import ExportBtn from "../../General/ExportBtn";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { SearchValueConstant, statusCode } from "../../../api/constants";
import trainingRequestService from "../../../services/trainingRequestService";
import handleResponseAsync from "../../../services/handleResponseAsync";
import { formatDateOnly } from "../../../utils/datetime/Formatting";
import getStatusById from "../../../utils/status/getStatusById";
import ErrorTemplate from "../../General/ErrorTemplate";

const ExportDataForm = ()=>{
    const [options, setOptions] = useState({startDate: "", endDate: "", status: { value: null, label: "All" }})
    const [showForm, setShowForm] = useState(false)
    const statusOption = [
      { value: getStatusById(statusCode.APPROVED), label: "Approved" },
      { value: getStatusById(statusCode.FORAPPROVAL), label: "For Approval" },
      { value: getStatusById(statusCode.DISAPPROVED), label: "Disapproved" },
      { value: getStatusById(statusCode.SUBMITTED), label: "Submitted" },
      { value: getStatusById(statusCode.CLOSED), label: "Closed" },
      { value: getStatusById(statusCode.INACTIVE), label: "Cancelled" },
      { value: null, label: "All" },
    ];
    const [data, setData] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequests = async () => {
        setLoading(true);
        handleResponseAsync(
          () =>
            trainingRequestService.getPagedTrainingRequest(
              1,
              1000,
              SearchValueConstant.DATERANGE, 
              formatDateOnly(options.startDate) + " - "+formatDateOnly(options.endDate), 
              options.status?.value
            ),
          (e) => setData(e),
          (e) => setError(e?.message ?? e),
          () => setLoading(false)
        );
      };
      getRequests();
    }, [
      options
    ]);
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
            noValidate
          >
            <Modal.Body className="py-0">
              <ErrorTemplate message={error} center />
              <Row className="">
                <Col className="col-6">
                  <Form.Label className="fw-bold">From</Form.Label>
                  <Form.Control value={options?.startDate} type="date" onChange={(e)=>setOptions(prev => ({...prev, startDate: e?.target?.value}))} />
                </Col>
                <Col className="col-6">
                  <Form.Label className="fw-bold" >To</Form.Label>
                  <Form.Control type="date" value={options?.endDate}  onChange={(e)=>setOptions(prev => ({...prev, endDate: e?.target?.value}))}  />
                </Col>
                <Col className="col-12 mt-2">
                  <Form.Label className="fw-bold">Request Status</Form.Label> 
                  <Select
                    options={statusOption}
                    value={options?.status}
                    onChange={(e) => setOptions(prev =>({ ...prev, status: e }))}
                  />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer className="border-0">
              {loading ? 
              <Button icon="pi pi-download" label="Export" className="rounded" size="small" disabled/>:
              <ExportBtn data={data?.results} closeModal={()=>setShowForm(false)}/>}
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