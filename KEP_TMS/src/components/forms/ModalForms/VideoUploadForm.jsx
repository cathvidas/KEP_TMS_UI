import { Col, Form, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import ErrorTemplate from "../../General/ErrorTemplate";
import { useRef, useState } from "react";
import proptype from "prop-types"
import { FileUpload } from "primereact/fileupload";
import { attachmentType } from "../../../api/constants";
import { actionFailed, actionSuccessful, confirmAction } from "../../../services/sweetalert";
import handleResponseAsync from "../../../services/handleResponseAsync";
import attachmentService from "../../../services/attachmentService";
import categoryHook from "../../../hooks/categoryHook";

const VideoUploadForm = ({ handleClose, handleShow, selectedData, onSuccess }) => {
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState({});
  const [validated, setValidated] = useState({});
  const [options] = useState([
    { label: "Active", value: true },
    { label: "Inactive", value: false },
  ]);
  const validFileTypes = [
    "video/*",
    "video/mp4",
    "video/mov",
    "video/avi",
    "video/vmw",
    "video/webm",
  ];
  const categories = categoryHook.useAllCategories(true);
  const fileUploadRef = useRef(null);
  const handleSubmit = () => {
    const files = fileUploadRef.current?.getFiles(); // getFiles() returns an array of files
    const formData = new FormData();
    formData.append("AttachmentType", attachmentType.VIDEO);
    formData.append("ReferenceId", category?.value);
    files.forEach((file) => {
      formData.append("Files", file);
    });
    confirmAction({
      showLoaderOnConfirm: true,
      title: "Upload?",
      message: "Are you sure you want to upload this video?",
      onConfirm: () => {
        handleResponseAsync(()=>
          attachmentService.addAttachments(formData),
          (e) => {
            actionSuccessful("Success", e?.message);
            onSuccess();
            handleClose();
          },
          (e) => {
            actionFailed("Error", e?.message);
          }
        )
      },
    })
  };
  
  const handleFileSelect = (e)=>{
    const files = e.files;
    files.forEach((file) => {
      const fileType = file["type"];
      if(!validFileTypes.includes(fileType)){
        actionFailed("Error", "Invalid file type. Please select a video file.");
        const currentFiles = fileUploadRef.current?.getFiles()
        fileUploadRef.current?.setFiles(currentFiles)
        return;
      }
    })
  }
  return (
    <>
      <Modal show={handleShow} onHide={handleClose} size={"md"}>
      <Modal.Header className="border-0" closeButton>
        <Modal.Title className={`h5 text-theme`}>
          {selectedData != null ? "Update Category" : "Upload Video"}
        </Modal.Title>
      </Modal.Header>
      <Form
        className={validated && "was-validated"}
        noValidate
      >
        <Modal.Body className="py-0">
          {errors.value && (
            <p className="text-red text-center">{errors.value}</p>
          )}
          <Row className="g-3">
              <Col className="col-12">
                <Form.Group>
                  <Form.Label className="required">Category</Form.Label>
                  <Select
                    options={categories?.data?.map(item=>({
                      label: item.name,
                      value: item.id,
                    }))}
                    value={category}
                    onChange={(e) =>
                      setCategory(e)
                    }
                    isLoading={category?.loading}
                    name="status"
                  />
                  {errors.status && <ErrorTemplate message={errors?.status} />}
                </Form.Group>
              </Col>
            <Col className="col-12">
            <Form.Label className="required">Attachments</Form.Label>
            <FileUpload ref={fileUploadRef} accept="video/*" cancelLabel="Clear" customUpload onSelect={handleFileSelect} uploadHandler={handleSubmit} multiple emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}    />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="border-0">
        </Modal.Footer>
      </Form>
      </Modal>
    </>
  );
};
VideoUploadForm.propTypes = {
  selectedData: proptype.object,
  handleClose: proptype.func,
  onSuccess: proptype.func,
  handleShow: proptype.bool,
}
export default VideoUploadForm;
