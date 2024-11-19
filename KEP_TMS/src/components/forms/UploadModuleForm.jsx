import { Card, CardBody, Col, Form, Row } from "react-bootstrap";
import { FormFieldItem } from "../trainingRequestFormComponents/FormElements";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import proptype from "prop-types";
import { actionSuccessful, confirmAction } from "../../services/sweetalert";
import handleResponseAsync from "../../services/handleResponseAsync";
import moduleService from "../../services/moduleService";
import { SessionGetEmployeeId } from "../../services/sessions";
import { getFileExtension } from "../../utils/fileUtils";
import { attachmentType } from "../../api/constants";
import attachmentService from "../../services/attachmentService";
import Select from "react-select";
import { ModuleAvailability } from "../../services/constants/appConstants";
import { combineDateTime } from "../../utils/datetime/FormatDateTime";
import validateModuleForm from "../../services/inputValidation/validateModuleForm";
import { CompareDates } from "../../utils/datetime/dateComparison";
import TextEditor from "./common/TextEditor";
const UploadModuleForm = ({
  requestData,
  setShowForm,
  handleRefresh,
  defaultValue,
  handleRemoveFile,
}) => {
  const [files, setFiles] = useState([]);
  const [savedFiles, setSavedFiles] = useState([]);
  const [details, setDetails] = useState({
    Name: "",
    Description: "",
    AvailableAt: null,
    UnavailableAt: null,
  });
  const [errors, setErrors] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const availabilityOptions = [
    { label: "Default", value: ModuleAvailability.IMMEDIATELY },
    {
      label: "Based On Training Dates",
      value: ModuleAvailability.TRAINING_DATES_BASED,
    },
    { label: "Custom Duration", value: ModuleAvailability.CUSTOM_DURATION },
  ];
  useEffect(() => {
    if (defaultValue) {
      setDetails({
        Name: defaultValue?.name,
        Description: defaultValue?.description,
        AvailableAt: defaultValue?.availableAt,
        UnavailableAt: defaultValue?.unavailableAt,
      });
      setSavedFiles(defaultValue?.attachments);
      if (
        CompareDates(
          defaultValue?.availableAt,
          getTrainingDates()?.AvailableAt
        ) &&
        CompareDates(
          defaultValue?.unavailableAt,
          getTrainingDates()?.UnavailableAt
        )
      ) {
        setSelectedOption(availabilityOptions[1]);
      } else if (defaultValue?.availableAt && defaultValue?.unavailableAt) {
        setSelectedOption(availabilityOptions[2]);
        setIsCustom(true);
      } else {
        setSelectedOption(availabilityOptions[0]);
      }
      setIsUpdate(true);
    } else setIsUpdate(false);
  }, [defaultValue]);
  const handleFileUpload = (e) => {
    setErrors({ ...errors, file: "" });
    const newFiles = Array.from(e.target.files);
    let validForm = true;
    newFiles.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          [file.name]: "File size should not exceed 5MB",
        });
        validForm = false;
      }
      if (files.some((x) => x.name === file.name)) {
        setErrors({ ...errors, [file.name]: "File name already exists" });
        validForm = false;
      }
      if (
        files.some(
          (x) =>
            x.name === file.name && x.size === file.size && x.type === file.type
        )
      ) {
        setErrors({ ...errors, file: "File already added" });
        validForm = false;
      }
      if (getFileExtension(file?.name) !== "pdf") {
        setErrors({ ...errors, file: "Upload only pdf files" });
        validForm = false;
      }
    });

    if (validForm) {
      setFiles([...files, ...newFiles]);
    }
  };
  const handleRemoveSpecificFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };
  const handleSubmit = () => {
    const validate = validateModuleForm(
      details,
      selectedOption?.value,
      files,
      false
    );
    if (validate.isValid) {
      confirmAction({
        showLoaderOnConfirm:true,
        title: "Upload Module",
        message: "Are you sure you want to upload this module?",
        onConfirm: () => {
          const data = new FormData();
          for (let i = 0; i < files.length; i++) {
            data.append("Files", files[i]);
          }
          data.append("RequestId", requestData.id);
          data.append("Name", details.Name);
          data.append("AvailableAt", details?.AvailableAt ?? "");
          data.append("UnavailableAt", details?.UnavailableAt ?? "");
          data.append("Description", details.Description);
          data.append("CreatedBy", SessionGetEmployeeId());
          handleResponseAsync(
            () => moduleService.createModule(data),
            (e) => {
              actionSuccessful("Success", e.message);
              handleRefresh();
            },
            (e) => actionSuccessful("Error", e.message)
          );
        },
      });
    } else {
      setErrors(validate.formErrors);
    }
  };
  const handleUpdateModule = () => {
    const validate = validateModuleForm(details, selectedOption?.value, files);
    if (validate.isValid) {
      const newData = {
        id: defaultValue.id,
        name: details.Name,
        description: details.Description,
        availableAt: details?.AvailableAt,
        unavailableAt: details?.UnavailableAt,
        updatedBy: SessionGetEmployeeId(),
      };
      confirmAction({
        showLoaderOnConfirm:true,
        title: "Update Module",
        text: "Are you sure you want to update this module?",
        onConfirm: () =>
          handleResponseAsync(
            () => moduleService.updateModule(newData),
            () => {
              files?.length > 0
                ? saveAttachments()
                : actionSuccessful(
                    "Success!",
                    "Successfully updated the module"
                  );
              handleRefresh();
            }
          ),
      });
    } else {
      setErrors(validate?.formErrors);
    }
  };
  const saveAttachments = () => {
    const formData = new FormData();
    formData.append("ReferenceId", defaultValue.id);
    formData.append("AttachmentType", attachmentType.MODULE);
    formData.append("EmployeeBadge", SessionGetEmployeeId());
    for (let i = 0; i < files.length; i++) {
      formData.append("Files", files[i]); // 'files' is the key for each file (server must handle this as array)
    }
    handleResponseAsync(
      () => attachmentService.addAttachments(formData),
      () => {
        actionSuccessful("Success!", "Successfully updated the module");
        handleRefresh();
      }
    );
  };
  const getTrainingDates = () => {
    const AvailableAt = combineDateTime(
      requestData.trainingDates[0]?.date,
      requestData.trainingDates[0]?.startTime,
      true
    );
    const UnavailableAt = combineDateTime(
      requestData.trainingDates[requestData.trainingDates?.length - 1]?.date,
      requestData.trainingDates[0]?.endTime,
      true
    );
    return { AvailableAt, UnavailableAt };
  };
  const setModuleAvailability = (e) => {
    const value = e.value;
    if (value === ModuleAvailability.IMMEDIATELY) {
      setDetails((prev) => ({
        ...prev,
        AvailableAt: null,
        UnavailableAt: null,
      }));
    }
    if (value === ModuleAvailability.TRAINING_DATES_BASED) {
      setDetails((prev) => ({ ...prev, ...getTrainingDates() }));
    }
    if (value === ModuleAvailability.CUSTOM_DURATION) {
      setIsCustom(true);
    } else {
      setIsCustom(false);
    }
    setSelectedOption(e);
  };
  return (
    <>
      <Card>
        <Card.Header className="d-flex align-items-center justify-content-between">
          <h5 className="m-0">Upload Module</h5>
          <Button icon="pi pi-times" type="button" text onClick={setShowForm} />
        </Card.Header>
        <CardBody>
          <Form>
            {errors?.common && errors.common}
            <Row>
              <FormFieldItem
                label={"Title"}
                required
                error={errors.Name}
                FieldComponent={
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={details.Name}
                    onChange={(e) =>
                      setDetails({ ...details, Name: e.target.value })
                    }
                  />
                }
              />
              <FormFieldItem
                label={"Content"}
                error={errors.Description}
                FieldComponent={
                  <>
                    <TextEditor
                      defaultValue={details.Description}
                      showToolbar
                      onChange={(e) =>
                        setDetails({ ...details, Description: e })
                      }
                    />
                  </>
                }
              />
              <FormFieldItem
                label={"Set Availability"}
                error={errors.Description}
                FieldComponent={
                  <>
                    <Select
                      options={availabilityOptions}
                      value={selectedOption ?? availabilityOptions[0]}
                      onChange={setModuleAvailability}
                    />
                  </>
                }
              />
              {isCustom && (
                <>
                  <FormFieldItem
                    label={"Start Date"}
                    error={errors.AvailableAt}
                    col={"col-sm-4"}
                    FieldComponent={
                      <>
                        {" "}
                        <input
                          className="form-control"
                          value={details.AvailableAt}
                          onChange={(e) =>
                            setDetails({
                              ...details,
                              AvailableAt: e.target.value,
                            })
                          }
                          type="datetime-local"
                        />
                      </>
                    }
                  />
                  <FormFieldItem
                    label={"End Date"}
                    error={errors.UnavailableAt}
                    col={"col-sm-4"}
                    FieldComponent={
                      <>
                        {" "}
                        <input
                          className="form-control"
                          value={details.UnavailableAt}
                          onChange={(e) =>
                            setDetails({
                              ...details,
                              UnavailableAt: e.target.value,
                            })
                          }
                          type="datetime-local"
                        />
                      </>
                    }
                  />
                  <Col className="col-12">
                    <hr className="mt-0" />
                  </Col>
                </>
              )}
              {isUpdate && savedFiles?.length > 0 && (
                <FormFieldItem
                  label={"Old Attachment"}
                  FieldComponent={
                    <>
                      {" "}
                      {files?.length > 0 && (
                        <small className="text-muted ms-2">
                          &#x28;{savedFiles?.length}{" "}
                          {savedFiles?.length > 1 ? "files" : "file"}&#x29;
                        </small>
                      )}
                      <div className="d-flex flex-wrap mb-2 gap-2">
                        {savedFiles?.map((file, index) => (
                          <div
                            key={`savedfile${index}`}
                            className="border bg-light rounded ps-2 d-flex align-items-center"
                            style={{ width: "fit-content" }}
                          >
                            <span>{file.fileName}</span>
                            <Button
                              type="button"
                              icon="pi pi-times"
                              text
                              onClick={() => handleRemoveFile(file.id)}
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  }
                />
              )}
              <FormFieldItem
                label={isUpdate ? "New Attachment" : "Attachment"}
                error={errors.file}
                FieldComponent={
                  <>
                    {files && (
                      <>
                        {files?.length > 0 && (
                          <small className="text-muted ms-2">
                            &#x28;{files?.length}{" "}
                            {files?.length > 1 ? "files" : "file"}&#x29;
                          </small>
                        )}
                        <div className="d-flex flex-wrap mb-2 gap-2">
                          {files?.map((file, index) => (
                            <div
                              key={`file${index}`}
                              className="border bg-light rounded ps-2 d-flex align-items-center"
                              style={{ width: "fit-content" }}
                            >
                              <span>{file.name}</span>
                              <Button
                                type="button"
                                icon="pi pi-times"
                                text
                                onClick={() => handleRemoveSpecificFile(index)}
                              />
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    <input
                      type="file"
                      className="form-control"
                      multiple
                      onChange={handleFileUpload}
                    />
                  </>
                }
              />
            </Row>
            <div className="text-end">
              <Button
                variant="primary"
                className="rounded"
                size="small"
                icon="pi pi-save"
                type="button"
                label={isUpdate ? "Update" : "Save"}
                onClick={isUpdate ? handleUpdateModule : handleSubmit}
              />
            </div>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

UploadModuleForm.propTypes = {
  setShowForm: proptype.func,
  handleRefresh: proptype.func,
  defaultValue: proptype.object,
  requestData: proptype.object,
  handleRemoveFile: proptype.func,
};
export default UploadModuleForm;
