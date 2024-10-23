import { Tooltip } from "primereact/tooltip";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { useRef, useState } from "react";
import { SectionHeading } from "../../components/General/Section";
import { checkFileIfImage } from "../../utils/fileUtils";
import attachmentService from "../../services/attachmentService";
import { attachmentType } from "../../api/constants";
import { SessionGetEmployeeId } from "../../services/sessions";
import handleResponseAsync from "../../services/handleResponseAsync";
import proptype from "prop-types"
import { confirmAction } from "../../services/sweetalert";

const TraineeCertificateView = ({data}) => {
  const toast = useRef(null);
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);

  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;
    let files = e.files;

    Object.keys(files).forEach((key) => {
      _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
  };

  const onTemplateUpload = (e) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });
    
    alert(123)
    setTotalSize(_totalSize);
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : "0 B";

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <div className="flex align-items-center gap-3 ml-auto">
          <span>{formatedValue} / 1 MB</span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "10rem", height: "12px" }}
          ></ProgressBar>
        </div>
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: "40%" }}>
          {/* if file is image */}
          {checkFileIfImage(file) ? (
            <img
              alt={file.name}
              role="presentation"
              src={file.objectURL}
              width={100}
            />
          ) : (
            <i className="pi pi-file"           
            style={{
                fontSize: "5em",
                borderRadius: "50%",
                backgroundColor: "var(--surface-b)",
                color: "var(--surface-d)",
              }}></i>
          )}
          <span className="flex flex-column justify-content-start ml-3">
            {file.name}
            <small className="me-auto">{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag
          value={props.formatSize}
          severity="warning"
          className="px-3 py-2"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ms-auto  rounded-circle"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column">
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="my-5"
        >
          Drag and Drop Certificate Here
        </span>
      </div>
    );
  };

  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
  };
  const uploadOptions = {
    icon: "pi pi-fw pi-cloud-upload",
    iconOnly: true,
    className:
      "custom-upload-btn p-button-success p-button-rounded p-button-outlined  rounded-circle",
  };
  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
      "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined  rounded-circle",
  };
const uploadCertificate = (e)=>{
    const file = e.files[0];
    if (file) {
    const formData = new FormData();
    formData.append("ReferenceId", data?.id);
    formData.append("AttachmentType", attachmentType.CERTIFICATE);
    formData.append("EmployeeBadge", SessionGetEmployeeId());
    formData.append("Files", file);
    confirmAction({
        title: "Upload Certificate",
        text: "Are you sure you want to upload this certificate?",
      onConfirm: () =>
        handleResponseAsync(
          () => attachmentService.addAttachment(formData),
          null,
          null,
        ),
    });
    }else{
        alert("No file selected")  // or show an error message
    }
}
  return (
    <div>
      <SectionHeading
        title="Certificate"
        icon={<i className="pi pi-trophy" />}
      />
      {/* <Toast ref={toast}></Toast> */}

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload
        ref={fileUploadRef}
        name="demo[]"
        url=""
        uploadHandler={uploadCertificate}
        customUpload
        maxFileSize={20000000}
        onUpload={onTemplateUpload}
        onSelect={onTemplateSelect}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
        
      />
    </div>
  );
};
TraineeCertificateView.propTypes = {
    data: proptype.object.isRequired,
}
export default TraineeCertificateView;
