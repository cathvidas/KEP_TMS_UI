import { Button } from "primereact/button";
import proptype from "prop-types";
import { Form, Modal, Row } from "react-bootstrap";
import { FormFieldItem } from "../../trainingRequestFormComponents/FormElements";
import Select from "react-select";
import { useEffect, useState } from "react";
import userConstant from "../../../services/constants/userConstant";
import validateUserDetails from "../../../services/inputValidation/validateUserDetails";
import { actionSuccessful, confirmAction } from "../../../services/sweetalert";
import handleResponseAsync from "../../../services/handleResponseAsync";
import userService from "../../../services/userService";
import {
  SessionGetEmployeeId,
  SessionGetRole,
} from "../../../services/sessions";
import { UserTypeValue } from "../../../api/constants";
import userHook from "../../../hooks/userHook";
const NewUserForm = ({
  showForm,
  closeForm,
  options,
  defaultData,
  isUpdate = false,
  headerTitle,
  onFinish,
  isAdmin = SessionGetRole() === UserTypeValue.ADMIN,
}) => {
  const [formData, setFormData] = useState(userConstant);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState({});
  const [mapppedSuperiors, setMappedSuperiors] = useState([]);
  const [paginatorConfig, setPaginatorConfig] = useState({
    first: 0,
    rows: 5,
    page: 1,
    value: null,
  });
  const superiors = userHook.useAllUsers(
    paginatorConfig.page,
    paginatorConfig.rows,
    paginatorConfig.value
  );
  const superiorData = userHook.useUserById(formData?.superiorBadge);
  useEffect(() => {
    if (showForm) {
      const mappedData = superiors?.data?.results?.map(
        ({ employeeBadge, fullname }) => ({
          label: fullname,
          value: employeeBadge,
        })
      );
      setMappedSuperiors(mappedData);
    }
  }, [superiors?.data?.results, showForm]);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const   handleSelectOnChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (defaultData) {
      setFormData(defaultData);
    } else {
      setFormData(userConstant);
    }
  }, [defaultData]);
  const handleSubmit = () => {
    const { errors, isValid } = validateUserDetails(formData);
    if (!isValid) {
      setError(errors);
    } else {
      const newFormData = isUpdate
        ? {
            ...formData,
            updatedBy: SessionGetEmployeeId(),
          }
        : {
            ...formData,
            createdBy: SessionGetEmployeeId(),
          };
      confirmAction({
        showLoaderOnConfirm: true,
        onConfirm: () =>
          handleResponseAsync(
            () =>
              isUpdate
                ? userService.updateUser(newFormData)
                : userService.createUser(newFormData),
            () =>
              actionSuccessful(
                "Success!",
                isUpdate
                  ? "User updated successfully"
                  : "User created successfully"
              ),
            null,
            onFinish
          ),
      });
    }
  };
  return (
    <>
      <Modal show={showForm} onHide={closeForm} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="theme-color h5">{headerTitle}</Modal.Title>
        </Modal.Header>
        <Form autoComplete="false">
          <Modal.Body>
            <Row>
              <FormFieldItem
                label="badge no"
                col="col-lg-4 col-sm-6"
                error={error?.employeeBadge}
                required
                FieldComponent={
                  <Form.Control
                    disabled={isUpdate}
                    placeholder="Badge No"
                    value={formData.employeeBadge}
                    name="employeeBadge"
                    onChange={handleOnChange}
                  />
                }
              />
              <FormFieldItem
                label="First Name"
                col="col-lg-4 col-sm-6"
                error={error?.firstname}
                required
                FieldComponent={
                  <Form.Control
                    placeholder="First Name"
                    value={formData.firstname}
                    name="firstname"
                    onChange={handleOnChange}
                    disabled={isUpdate && !isAdmin}
                  />
                }
              />
              <FormFieldItem
                error={error?.lastname}
                label="last Name"
                required
                col="col-lg-4 col-sm-6"
                FieldComponent={
                  <Form.Control
                    placeholder="Last Name"
                    value={formData.lastname}
                    name="lastname"
                    onChange={handleOnChange}
                    disabled={isUpdate && !isAdmin}
                  />
                }
              />
              <FormFieldItem
                required
                error={error?.username}
                label="NTName"
                col="col-lg-4 col-sm-6"
                FieldComponent={
                  <Form.Control
                    placeholder="Username"
                    value={formData.username}
                    name="username"
                    onChange={handleOnChange}
                    disabled={isUpdate && !isAdmin}
                  />
                }
              />
              <FormFieldItem
                required
                error={error?.email}
                label="email"
                col="col-lg-4 col-sm-6"
                FieldComponent={
                  <Form.Control
                    placeholder="Email"
                    value={formData.email}
                    name="email"
                    onChange={handleOnChange}
                  />
                }
              />
              <FormFieldItem
                required
                label="Superior"
                col="col-lg-4 col-sm-6"
                error={error?.superiorBadge}
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
                    isLoading={superiors?.loading}
                    options={mapppedSuperiors}
                    value={{
                      value: superiorData?.data?.superiorBadge,
                      label: superiorData?.data?.fullname,
                    }}
                    onChange={(e) =>
                      handleSelectOnChange("superiorBadge", e.value)
                    }
                    isDisabled={isUpdate && !isAdmin}
                  />
                }
              />
              <FormFieldItem
                required
                error={error?.departmentId}
                label="Department"
                col="col-lg-4 col-sm-6"
                FieldComponent={
                  <Select
                    isLoading={options?.loading}
                    options={options?.options?.departments}
                    value={
                      !options?.loading &&
                      options?.options?.departments?.filter(
                        (x) => x.value === formData?.departmentId
                      )
                    }
                    onChange={(e) =>
                      handleSelectOnChange("departmentId", e.value)
                    }
                    isDisabled={isUpdate && !isAdmin}
                  />
                }
              />
              <FormFieldItem
                required
                error={error?.positionId}
                label="Position"
                col="col-lg-4 col-sm-6"
                FieldComponent={
                  <Select
                    isLoading={options?.positions}
                    options={options?.options?.positions}
                    value={
                      !options?.loading &&
                      options?.options?.positions?.filter(
                        (x) => x.value === formData?.positionId
                      )
                    }
                    onChange={(e) =>
                      handleSelectOnChange("positionId", e.value)
                    }
                    isDisabled={isUpdate && !isAdmin}
                  />
                }
              />
              <FormFieldItem
                required
                error={error?.employeeTypeId}
                label="Employee Type"
                col="col-lg-4 col-sm-6"
                FieldComponent={
                  <Select
                    isLoading={options?.loading}
                    options={options?.options?.empTypes}
                    value={
                      !options?.loading &&
                      options?.options?.empTypes?.filter(
                        (x) => x.value === formData?.employeeTypeId
                      )
                    }
                    onChange={(e) =>
                      handleSelectOnChange("employeeTypeId", e.value)
                    }
                    isDisabled={isUpdate && !isAdmin}
                  />
                }
              />
              <FormFieldItem
                required
                error={error?.roleId}
                label="Role"
                col="col-lg-4 col-sm-6"
                FieldComponent={
                  <Select
                    isLoading={options?.loading}
                    options={options?.options?.roles}
                    value={
                      !options?.loading &&
                      options?.options?.roles?.filter(
                        (x) => x.value === formData?.roleId
                      )
                    }
                    isDisabled={isUpdate && !isAdmin}
                    onChange={(e) => handleSelectOnChange("roleId", e.value)}
                  />
                }
              />
              <FormFieldItem
                required
                error={error?.password}
                label="Password"
                col="col-lg-4 col-sm-6"
                FieldComponent={
                  <div className="position-relative">
                    <Form.Control
                      autoComplete="false"
                      type={!showPass ? "password" : "text"}
                      placeholder="Password"
                      value={formData?.password ?? ""}
                      name="password"
                      onChange={handleOnChange}
                    />
                    <Button
                      text
                      icon={showPass ? "pi pi-eye" : "pi pi-eye-slash"}
                      style={{ width: "fit-content" }}
                      className="p-0 position-absolute top-50 end-0 translate-middle"
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                    />
                  </div>
                }
              />
              {isUpdate && (
                <FormFieldItem
                  label="Status"
                  col="col-lg-4 col-sm-6"
                  FieldComponent={
                    <Select
                      isLoading={options?.loading}
                      options={options?.options?.status}
                      value={
                        !options?.loading &&
                        options?.options?.status?.filter(
                          (x) => x.value === formData?.statusId
                        )
                      }
                      isDisabled={isUpdate && !isAdmin}
                      onChange={(e) =>
                        handleSelectOnChange("statusId", e.value)
                      }
                    />
                  }
                />
              )}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              className="rounded"
              text
              onClick={() => setFormData(isUpdate ? defaultData : userConstant)}
              label="Reset"
            />
            <Button
              type="button"
              className="rounded"
              label="Submit"
              onClick={handleSubmit}
            />
            {/* <Button variant="danger" >
              Delete
            </Button> */}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
NewUserForm.propTypes = {
  showForm: proptype.bool, // Show Modal or not
  isUpdate: proptype.bool, // Show Modal or not
  closeForm: proptype.func, // Function to close Modal
  options: proptype.object, // Options for dropdowns
  defaultData: proptype.object, // Default data for form
  headerTitle: proptype.string,
  onFinish: proptype.func, // Function to handle form submission
  isAdmin: proptype.bool, //
};
export default NewUserForm;
