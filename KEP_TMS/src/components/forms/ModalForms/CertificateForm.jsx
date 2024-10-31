import { Modal, Row } from "react-bootstrap";
import { FormFieldItem } from "../../trainingRequestFormComponents/FormElements";
import { Button } from "primereact/button";
import Select from "react-select";
import { useState } from "react";
import proptype from "prop-types";
import { actionSuccessful, confirmAction } from "../../../services/sweetalert";
import handleResponseAsync from "../../../services/handleResponseAsync";
import attachmentService from "../../../services/attachmentService";
import { attachmentType } from "../../../api/constants";
import { SessionGetEmployeeId } from "../../../services/sessions";
const CertificateForm = ({showModal, hideModal, onFinish, trainingOptions}) => {
    const [oldTraining, setOldTraining] = useState(false);
    const [files, setFiles] = useState([])
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState("")
    const hanldeInputFile = (e) => {
      const newFiles = Array.from(e.target.files);
      let newError = "";
      newFiles.forEach((file) => {
        const isExist = files.find((f) => f.name === file.name);
         newError  += isExist ? `${file.name} already exist\n`: "";
        if (!isExist) {
          setFiles([...files, file]);
        }
      });
      setErrors({...errors, files: newError});
    };
    const handleRemoveSpecificFile = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
      };
      const handleSubmitForm = () => {
          const newErrors = {};
          let isValid = true;
          if (!oldTraining && !formData.trainingName) {
            newErrors.trainingName = "Training Name is required";
            isValid = false;
          }
          if (oldTraining && !formData.certificateDetail) {
            newErrors.certificateDetail = "Certificate detail is required";
            isValid = false;
          }
          if (files?.length === 0) {
            newErrors.files = "Attachment is required";
            isValid = false;
          }
          setErrors({...errors, ...newErrors});
          if (isValid) {
            const newData = new FormData();
            if (!oldTraining) {
              newData.append(
                "ReferenceId",
                oldTraining ? SessionGetEmployeeId() : formData?.trainingName
              );
            }
            newData.append("AttachmentType", attachmentType.CERTIFICATE);
            newData.append("Detail", formData.certificateDetail);

            newData.append("EmployeeBadge", SessionGetEmployeeId());
            files.forEach((file) => {
              newData.append("files", file);
            });
            var object = {};
            newData.forEach((value, key) => object[key] = value);
var json = JSON.stringify(object);
            console.log(JSON.stringify(json), formData.certificateDetail);
            confirmAction({
                showLoaderOnConfirm: true,
                text: "Are you sure you want to upload this certificate?",
                onConfirm: () => {
                    handleResponseAsync(
                        ()=>attachmentService.addAttachments(newData),
                        (e)=>{actionSuccessful("Success", e?.message);
                            onFinish();
                        }
                    )
                }
            })
          }

      }
      console.log(formData);
  return (
    <>
      <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title className="theme-color h5">Upload New Certificate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {!oldTraining &&
            <FormFieldItem
              label={"Training Name"}
              error={errors.trainingName}
              FieldComponent={
                <Select
                options={trainingOptions}
                value={trainingOptions?.find((option) => option.value === formData?.trainingName)}
                onChange={(e) => setFormData({...formData, trainingName: e.value})}
                />
              }
            />}
            <FormFieldItem
              label={"Certificate Detail"}
              error={errors.certificateDetail}
              FieldComponent={
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Certificate name or details..."
                  value={formData?.certificateDetail}
                  onChange={(e) => setFormData({...formData, certificateDetail: e.target.value})}
                ></textarea>
              }
            />
            <FormFieldItem
              label={"Attachment"}
              required
              error={errors?.files}
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
                  placeholder="Certificate Name"
                  multiple
                  onChange={hanldeInputFile}
                /></>
              }
            />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" className="rounded" size="small" onClick={()=>setOldTraining(!oldTraining)} text
           label={oldTraining ? "Current Training" : "Previous Training"} 
          />
          <Button type="button"  onClick={handleSubmitForm} size="small" icon="pi pi-upload" className="rounded"
          label="Upload Certificate"/>
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
}
export default CertificateForm;
