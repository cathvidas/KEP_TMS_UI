import { Col, Form, Modal, Row } from "react-bootstrap";
import proptype from "prop-types";
import { useEffect, useMemo, useState } from "react";
import ErrorTemplate from "../../General/ErrorTemplate";
import { Button } from "primereact/button";
import Select from "react-select";
import { statusCode } from "../../../api/constants";
import userHook from "../../../hooks/userHook";
import handleResponseAsync from "../../../services/handleResponseAsync";
import CostApprovalMatrixService from "../../../services/CostApprovalMatrixService";
import { confirmAction } from "../../../services/sweetalert";
import { SessionGetEmployeeId } from "../../../services/sessions";

const CostApprovalMatrixForm = ({ handleShow, handleClose, selectedData, onFinish }) => {
  const [formData, setFormData] = useState(selectedData);
  const [errors, setErrors] = useState({});
  const [mapppedUsers, setMappedUsers] = useState([]);
    const options = useMemo(
      () => [
        { label: "Active", value: statusCode.ACTIVE },
        { label: "Inactive", value: statusCode.INACTIVE },
      ],
      []
    );
    
  const [paginatorConfig, setPaginatorConfig] = useState({
    first: 0,
    rows: 5,
    page: 1,
    value: null,
  });
  const users = userHook.useAllUsers(
    paginatorConfig.page,
    paginatorConfig.rows,
    paginatorConfig.value
  );
  const approverDetail = userHook.useUserById(formData?.employeeBadge);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData?.employeeBadge){
      setErrors(prev=>({...prev, approver: "No Approver selected" }));
      return;
    }
    confirmAction({
      title: selectedData ? "Update Cost Approval Matrix" : "Add Cost Approval Matrix",
      text: "Are you sure you want to submit?",
      onConfirm: () => 
        handleResponseAsync(
          () =>
            selectedData?.id
              ? CostApprovalMatrixService.updateCostApprovalMatrix({
                ...formData,
                updatedBy: SessionGetEmployeeId(),
              })
              : CostApprovalMatrixService.createCostApprovalMatrix({
                ...formData,
                createdBy: SessionGetEmployeeId(),
              }),
          () => {
            handleClose();
            onFinish();
          }
        )
    })
  };
  useEffect(() => {
      const mappedData = users?.data?.results?.map(
        ({ employeeBadge, fullname }) => ({
          label: fullname,
          value: employeeBadge,
        })
      );
      setMappedUsers(mappedData);
  }, [users?.data?.results]);
  useEffect(()=>{
      setFormData(selectedData)
  }, [selectedData])
  
  const   handleSelectOnChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      {" "}
      <Modal show={handleShow} onHide={handleClose} size={"md"}>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title className={`h5 theme-color`}>
            {selectedData != null ? "Update Metrics" : "Add New Metrics"}
          </Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={handleSubmit}
          noValidate
        >
          <Modal.Body className="py-0">
            {errors.value && (
              <p className="text-red text-center">{errors.value}</p>
            )}
            <Row className="g-3">
              <Col className="col-12">
                <Form.Group>
                  <Form.Label className="required">Approver</Form.Label>
                  <Select
                    onMenuScrollToBottom={() =>
                      setPaginatorConfig((prev) => ({
                        ...prev,
                        rows: prev.rows + 10,
                      }))
                    }
                    onInputChange={(e) =>
                      setPaginatorConfig((prev) => ({ ...prev, value: e }))
                    }
                    isLoading={users?.loading}
                    options={mapppedUsers}
                    value={{
                      value: approverDetail?.data?.employeeBadge,
                      label: approverDetail?.data?.fullname,
                    }}
                    onChange={(e) =>
                      handleSelectOnChange("employeeBadge", e.value)
                    }
                  />
                  {errors.approver && <ErrorTemplate message={errors?.approver} />}
                </Form.Group>
              </Col>
              <Col className="col-6">
                <Form.Group>
                  <Form.Label className="required">Level</Form.Label>  <Form.Control
                    type="number"
                    name="name"
                    value={formData?.level ?? ""}
                    placeholder="Level"
                    onChange={(e)=>
                      handleSelectOnChange("level", e.target.value)}
                    required
                  />
                  {errors.level && (
                    <ErrorTemplate message={errors?.level} />
                  )}
                </Form.Group>
              </Col>
            
              <Col>
                <Form.Group>
                  <Form.Label className="required">Cost Range</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData?.costRange ?? ""}
                    placeholder="y-xxx"
                    onChange={(e)=>
                      handleSelectOnChange("costRange", e.target.value)}
                    required
                  />
                  {errors.costRange && <ErrorTemplate message={errors?.costRange} />}
                </Form.Group>
              </Col>
              {selectedData && (
                <Col className="col-12">
                  <Form.Group>
                    <Form.Label className="required">Status</Form.Label>
                    <Select
                      options={options}
                      value={options.filter(
                        (x) => x.value == formData?.statusId
                      )}
                      onChange={(e) =>
                        setFormData({ ...formData, statusId: e.value })
                      }
                      name="status"
                    />
                    {errors.status && (
                      <ErrorTemplate message={errors?.status} />
                    )}
                  </Form.Group>
                </Col>
              )}
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button
              type="button"
              label="Cancel"
              onClick={handleClose}
              className="p-button-text rounded"
            />
            <Button
              type="submit"
              label={selectedData != null ? "Update" : "Create"}
              className="rounded"
            />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
CostApprovalMatrixForm.propTypes = {
  handleShow: proptype.bool.isRequired,
  handleClose: proptype.func,
  selectedData: proptype.object,
  onFinish: proptype.func,
};
export default CostApprovalMatrixForm;
