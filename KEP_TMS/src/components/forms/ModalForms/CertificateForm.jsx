import { Modal, Row } from "react-bootstrap";
import { FormFieldItem } from "../../trainingRequestFormComponents/FormElements";
import { Button } from "primereact/button";
import Select from "react-select";
import { useEffect, useState } from "react";
import proptype from "prop-types";
import {
  actionFailed,
  actionSuccessful,
  confirmAction,
} from "../../../services/sweetalert";
import handleResponseAsync from "../../../services/handleResponseAsync";
import { SessionGetEmployeeId, SessionGetRole } from "../../../services/sessions";
import certificateService from "../../../services/certificateService";
import attachmentService from "../../../services/attachmentService";
import { attachmentType, UserTypeValue } from "../../../api/constants";
const CertificateForm = ({
  showModal,
  hideModal,
  onFinish,
  trainingOptions,
  userId,
  defaultValue,
  defaultTraining,
  userOptions,
}) => {
  const [oldTraining, setOldTraining] = useState(false);
  const [files, setFiles] = useState([]);
  const [oldFiles, setOldFiles] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState("");
  const [update, setUpdate] = useState(false);
  const handleFileUpload = (e) => {
    setErrors({ ...errors, file: "" });
    const newFiles = Array.from(e.target.files);
    let validForm = true;
    const validImageTypes = [
      "image/gif",
      "image/jpeg",
      "image/png",
      "application/pdf",
    ];
    newFiles.forEach((file) => {
      const fileType = file["type"];
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
      if (!validImageTypes.includes(fileType)) {
        setErrors({ ...errors, file: "Upload only pdf files" });
        validForm = false;
      }
    });

    if (validForm) {
      setFiles([...files, ...newFiles]);
    }
  };
  useEffect(() => {
    if (defaultValue) {
      const x = trainingOptions?.find(
        (item) => item?.value === defaultValue?.requestId
      );
      setFormData({
        ...formData,
        certificateDetail: defaultValue?.detail,
        training: defaultTraining ?? x,
      });
      setOldFiles(defaultValue?.attachments);
      setUpdate(true);
    } else {
      setFormData(defaultTraining ? { training: defaultTraining } : {});
      setUpdate(false);
    }
  }, [defaultValue]);
  const handleRemoveSpecificFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };
  const handleSubmitForm = () => {
    const newErrors = {};
    let isValid = true;
    if (
      !oldTraining &&
      (formData.training?.value === 0 || !formData.training)
    ) {
      newErrors.training = "Training Name is required";
      isValid = false;
    }
    if (oldTraining && !formData.certificateDetail) {
      newErrors.certificateDetail = "Certificate detail is required";
      isValid = false;
    }
    if (files?.length === 0) {
      newErrors.file = "Attachment is required";
      isValid = false;
    }
    if ((userOptions && SessionGetRole() === UserTypeValue.ADMIN) && !formData.user?.value) {
      newErrors.user = "Participant is required";
      isValid = false;
    }
    setErrors({ ...errors, ...newErrors });
    if (isValid) {
      setErrors({});
      const newData = new FormData();
      for (let i = 0; i < files.length; i++) {
        newData.append("Files", files[i]);
      }
      if (!oldTraining) {
        newData.append("RequestId", formData?.training?.value);
      }
      newData.append("EmployeeBadge", (userOptions && formData?.user?.value) ? formData?.user?.value :userId);
      newData.append("CreatedBy", SessionGetEmployeeId());
      newData.append("Detail", formData.certificateDetail ?? "");

      confirmAction({
        showLoaderOnConfirm: true,
        title: "Upload Certificate",
        text: "Are you sure you want to upload this certificate?",
        onConfirm: () => {
          handleResponseAsync(
            () => certificateService.createCertificate(newData),
            (e) => {
              actionSuccessful("Success", e?.message);
              setFiles([])
              onFinish(true);
            }
          );
        },
      });
    }
  };
  const updateCertificate = () => {
    const updatedData = {
      ...defaultValue,
      detail: formData.certificateDetail,
      updatedBy: SessionGetEmployeeId(),
    };
    confirmAction({
      showLoaderOnConfirm: true,
      text: "Are you sure you want to continue?",
      onConfirm: () => {
        handleResponseAsync(
          () => certificateService.updateCertificate(updatedData),
          () => {
            "";
          },
          null,
          uploadNewAttachments()
        );
      },
    });
  };
  const uploadNewAttachments = () => {
    const formData = new FormData();
    formData.append("ReferenceId", defaultValue?.id);
    formData.append("AttachmentType", attachmentType.CERTIFICATE);
    for (let i = 0; i < files.length; i++) {
      formData.append("Files", files[i]);
    }
    handleResponseAsync(
      () => attachmentService.addAttachments(formData),
      () => {
        actionSuccessful("Success", "Certificate updated successfully");
        onFinish(true);
        setUpdate(false);
        setFiles([]);
      },
      () => {
        actionFailed("Failed", "Failed to upload new attachment/s");
        onFinish(false);
      }
    );
  };

  const deleteOldFile = (id) => {
    confirmAction({
      title: "Delete File",
      text: "Are you sure you want to delete this File?",
      onConfirm: () => {
        handleResponseAsync(
          () => attachmentService.deleteAttachment(id),
          null,
          null,
          onFinish(false)
        );
      },
    });
  };
  return (
    <>
      <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title className="theme-color h5">{update ? "Update Certificate": "Upload New Certificate"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {(!oldTraining || update) && (
              <FormFieldItem
                label={"Training Program"}
                required
                error={errors.training}
                FieldComponent={
                  <Select
                    options={trainingOptions}
                    value={formData?.training}
                    onChange={(e) => setFormData({ ...formData, training: e })}
                  />
                }
              />
            )}
            {(userOptions && SessionGetRole() === UserTypeValue.ADMIN)&& (
              <FormFieldItem
                label={"Participant"}
                error={errors.user}
                required
                FieldComponent={
                  <Select
                    options={userOptions}
                    value={formData?.user}
                    onChange={(e) => setFormData({ ...formData, user: e })}
                  />
                }
              />
            )}
            <FormFieldItem
              label={"Certificate Detail"}
              error={errors.certificateDetail}
              FieldComponent={
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Certificate name or details..."
                  value={formData?.certificateDetail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      certificateDetail: e.target.value,
                    })
                  }
                ></textarea>
              }
            />
            {update && (
              <FormFieldItem
                label={"Old Files"}
                FieldComponent={
                  <>
                    {oldFiles && (
                      <>
                        {oldFiles?.length > 0 && (
                          <small className="text-muted ms-2">
                            &#x28;{oldFiles?.length}{" "}
                            {files?.length > 1 ? "files" : "file"}&#x29;
                          </small>
                        )}
                        <div className="d-flex flex-wrap mb-2 gap-2">
                          {oldFiles?.map((file) => (
                            <div
                              key={`file${file?.id}`}
                              className="border bg-light rounded ps-2 d-flex align-items-center"
                              style={{ width: "fit-content" }}
                            >
                              <span>{file.fileName}</span>
                              <Button
                                type="button"
                                icon="pi pi-times"
                                text
                                onClick={() => deleteOldFile(file?.id)}
                              />
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                }
              />
            )}
            <FormFieldItem
              label={"Attachment"}
              required
              error={errors?.file}
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
                    placeholder="Certificate Name"
                    multiple
                    onChange={handleFileUpload}
                  />
                </>
              }
            />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {update ? (
            <Button
              type="button"
              className="rounded"
              size="small"
              icon="pi pi-save"
              onClick={updateCertificate}
              label="Update"
            />
          ) : (
            <>
              {/* <Button
                type="button"
                className="rounded"
                size="small"
                onClick={() => setOldTraining(!oldTraining)}
                text
                label={oldTraining ? "Current Training" : "Previous Training"}
              /> */}
              <Button
                type="button"
                onClick={handleSubmitForm}
                size="small"
                icon="pi pi-upload"
                className="rounded"
                label="Upload Certificate"
              />
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
CertificateForm.propTypes = {
  onFinish: proptype.func,
  showModal: proptype.bool,
  hideModal: proptype.func,
  trainingOptions: proptype.array,
  userId: proptype.string,
  defaultValue: proptype.object,
  defaultTraining: proptype.object,
  userOptions: proptype.array,
};
export default CertificateForm;
