import { Card, CardBody, Form } from "react-bootstrap";
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
const UploadModuleForm = ({
  reqId,
  setShowForm,
  handleRefresh,
  defaultValue,
  handleRemoveFile,
}) => {
  const [files, setFiles] = useState([]);
  const [savedFiles, setSavedFiles] = useState([]);
  const [details, setDetails] = useState({ Name: "", Description: "" });
  const [errors, setErrors] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  console.log(defaultValue)
  useEffect(() => {
    if (defaultValue) {
      setDetails({
        Name: defaultValue?.name,
        Description: defaultValue?.description,
      });
      setSavedFiles(defaultValue?.attachments);
      setIsUpdate(true);
    }
    else(setIsUpdate(false))
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
    confirmAction({
      title: "Upload Module",
      message: "Are you sure you want to upload this module?",
      onConfirm: () => {
        const validate = validateForm();
        if (validate) {
          const data = new FormData();
          for (let i = 0; i < files.length; i++) {
            data.append("Files", files[i]); // 'files' is the key for each file (server must handle this as array)
          }
          // data.append('Files', files); // Append the file
          data.append("RequestId", reqId);
          data.append("Name", details.Name); // Append other fields
          data.append("Description", details.Description);
          data.append("CreatedBy", SessionGetEmployeeId());
          handleResponseAsync(
            () => moduleService.createModule(data),
            (e) => {
              actionSuccessful("Success", e.message);
              handleRefresh();
            },
            (e) => actionSuccessful("Error", e.message)
            // ()=> handleRefresh(),
          );
        }
      },
    });
  };
  const handleUpdateModule = () => {
    const newData = {
      id: defaultValue.id,
      name: details.Name,
      description: details.Description,
      updatedBy: SessionGetEmployeeId(),
    };
    confirmAction({
      title: "Update Module",
      text: "Are you sure you want to update this module?",
      onConfirm: () =>
        handleResponseAsync(
          () => moduleService.updateModule(newData),
          () => {files?.length > 0 ? saveAttachments() : 
            actionSuccessful("Success!", "Successfully updated the module");
            handleRefresh();
          }
        ),
    });
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
      ()=>{   actionSuccessful("Success!", "Successfully updated the module");
        handleRefresh();}
    )
  };
  const validateForm = () => {
    let formErrors = {};
    let validForm = true;
    if (!details.Name) {
      formErrors.Name = "Title is required";
      validForm = false;
    }
    if (!details.Description) {
      formErrors.Description = "Description is required";
      validForm = false;
    }
    if (files?.length === 0) {
      formErrors.file = "Please select at least one file";
      validForm = false;
    }
    if (!validForm) {
      setErrors(formErrors);
    }
    return validForm;
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
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Description or Content"
                    rows={3}
                    value={details.Description}
                    onChange={(e) =>
                      setDetails({ ...details, Description: e.target.value })
                    }
                  ></textarea>
                </>
              }
            />

            {isUpdate && savedFiles?.length > 0 && (
                <FormFieldItem
                  label={"Old Attachment"}
                  FieldComponent={
                    <>    {files?.length > 0 && (
                      <small className="text-muted ms-2">
                        &#x28;{savedFiles?.length} {savedFiles?.length > 1 ? "files" : "file"}&#x29;
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
                          &#x28;{files?.length} {files?.length > 1 ? "files" : "file"}&#x29;
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
  reqId: proptype.number.isRequired,
  setShowForm: proptype.func,
  handleRefresh: proptype.func,
  defaultValue: proptype.object,
  handleRemoveFile: proptype.func,
};
export default UploadModuleForm;
