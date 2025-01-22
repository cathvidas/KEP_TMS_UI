import { Form, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import proptype from "prop-types";
import { FormFieldItem } from "../../trainingRequestFormComponents/FormElements";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import userHook from "../../../hooks/userHook";
import { SessionGetEmployeeId } from "../../../services/sessions";
import {
  actionFailed,
  actionSuccessful,
  confirmAction,
} from "../../../services/sweetalert";
import handleResponseAsync from "../../../services/handleResponseAsync";
import commonService from "../../../services/commonService";
const ApproverRouteForm = ({
  activityId,
  showForm,
  closeForm,
  userType,
  onFinish,
  currentApprover,
  routeData,
  activityType,
}) => {
  const [selectedUser, setSelectedUser] = useState({ label: "", value: "" });
  const [selectedUser2, setSelectedUser2] = useState({ label: "", value: "" });
  const [remarks, setRemarks] = useState("");
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
  const [options, setOptions] = useState([]);
  const [option2, setOption2] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const filteredData = users?.data?.results?.filter(
      (user) => user.roleName !== userType
    );
    const mappedData = routeData?.map((user) => ({
      label: user?.fullname,
      value: user?.employeeBadge,
    }));
    const mappedData2 = filteredData?.map((user) => ({
      label: user?.fullname,
      value: user?.employeeBadge,
    }));
    setOptions(mappedData);
    setOption2(mappedData2);
    if (currentApprover) {
      setSelectedUser({
        value: currentApprover?.employeeBadge,
        label: currentApprover?.fullname,
      });
    } else {
      null;
    }
  }, [users?.data?.results, userType, routeData, currentApprover]);
  const handleSubmit = () => {
    const isExist = routeData?.find(
      (user) => user.employeeBadge === selectedUser2?.value
    );
    if (isExist) {
      setError("Selected user already an approver");
      return;
    }
    const newData = {
      from: selectedUser?.value,
      to: selectedUser2?.value,
      transactId: activityId,
      activityIn: activityType,
      transactedBy: SessionGetEmployeeId(),
      remarks: remarks,
    };
    confirmAction({
      onConfirm: () => {
        handleResponseAsync(
          () => commonService.rerouteApprover(newData),
          (e) => actionSuccessful("Success!", e.message),
          (e) => actionFailed("Error!", e.message),
          onFinish
        );
      },
    });
  };
  return (
    <>
      <Modal show={showForm} onHide={closeForm}>
        <Modal.Header closeButton>
          <Modal.Title className="h5 theme-color">{`Change Approver`}</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Row>
              <FormFieldItem
                label={"From"}
                FieldComponent={
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
                    value={selectedUser}
                    onChange={setSelectedUser}
                  />
                }
              />
              <FormFieldItem
                label={"To"}
                error={error}
                FieldComponent={
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
                    options={option2}
                    value={selectedUser2}
                    onChange={setSelectedUser2}
                  />
                }
              />
              <FormFieldItem
                label={"Reason"}
                error={error}
                FieldComponent={
                  <Form.Control
                    options={option2}
                    placeholder="type reason here"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                }
              />
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              onClick={closeForm}
              className="rounded"
              text
              label="Cancel"
            />
            <Button
              type="button"
              className="rounded"
              label="Save"
              onClick={handleSubmit}
            />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
ApproverRouteForm.propTypes = {
  showForm: proptype.bool,
  closeForm: proptype.func,
  userType: proptype.string,
  activityId: proptype.any,
  userRoles: proptype.array,
  activityType: proptype.any,
  routeData: proptype.array,
  optionList: proptype.object,
  currentApprover: proptype.object,
  onFinish: proptype.func,
};
export default ApproverRouteForm;
