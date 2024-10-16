import { Card, CardBody, Form } from "react-bootstrap";
import { FormFieldItem } from "../trainingRequestFormComponents/FormElements";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import proptype from "prop-types";
import { actionSuccessful, confirmAction } from "../../services/sweetalert";
import handleResponseAsync from "../../services/handleResponseAsync";
import moduleService from "../../services/moduleService";
import { SessionGetEmployeeId } from "../../services/sessions";
const UploadModuleForm = ({ reqId , setShowForm, handleRefresh}) => {
  const [files, setFiles] = useState([]);
  const [details, setDetails] = useState({ Name: "", Description: "" });
  const [errors, setErrors] = useState({});
  const getExtension=(filename)=> {
    return filename.split('.').pop()
  }
  const handleFileUpload = (e) => { 
    setErrors({...errors, file:  "" })
    const newFiles = Array.from(e.target.files);
    let validForm = true;
    newFiles.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({...errors, [file.name]: "File size should not exceed 5MB" });
        validForm = false;
      }
      if (files.some(x => x.name === file.name)) {
        setErrors({...errors, [file.name]: "File name already exists" });
        validForm = false;
      }
      if (files.some(x => x.name === file.name
        && x.size === file.size
        && x.type === file.type)) {
        setErrors({...errors, file: "File already added" });
        validForm = false;
      }    
      if(getExtension(file?.name)!=='pdf'){
              setErrors({...errors, file:  "Upload only pdf files" })
              validForm= false
            }
    });
    
    if(validForm){
    setFiles([...files,...newFiles]);}
  //  newFiles.map(x=>{
  //     //write code that will show an error if the file is not in pdf format
  //     if(!x.name.includes('pdf')){
  //       setErrors({...errors, [x.file]:  "Upload only pdf files" })
  //       return false
  //     }
  //     // setErrors({...errors, [x.file]: "File format not supported" })
  //   })
  //   setFiles([...files, ...newFiles]);
  };
  useEffect
  const handleRemoveSpecificFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };
  const handleSubmit = () => {
    const validate = validateForm();
    if(validate){
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append("Files", files[i]); // 'files' is the key for each file (server must handle this as array)
      }
      // data.append('Files', files); // Append the file
      data.append("RequestId", reqId);
      data.append("Name", details.Name); // Append other fields
      data.append("Description", details.Description);
      data.append("CreatedBy", SessionGetEmployeeId());
      handleResponseAsync(() => moduleService.createModule(data),
    (e)=> {actionSuccessful("Success", e.message);
      handleRefresh();
    },
    (e)=> actionSuccessful("Error", e.message),
    // ()=> handleRefresh(), 
    )
    }
    
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
    if(files?.length === 0){
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
          <Button icon="pi pi-times" type="button" text onClick={setShowForm}/>
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
            <FormFieldItem
              label={"Attachment"}
              error={errors.file}
              FieldComponent={
                <>
                  {files && (
                    <>
                      {files?.length > 0 && (
                        <small className="text-muted ms-2">
                          &#x28;{files?.length} files&#x29;
                        </small>
                      )}
                      <div className="d-flex flex-wrap mb-2 gap-2">
                        {files?.map((file, index) => (
                          <div
                            key={file.name}
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
                label="Save"
                onClick={() =>
                  confirmAction({
                    title: "Upload Module",
                    message: "Are you sure you want to upload this module?",
                    // confirmLabel: "Yes",
                    onConfirm: handleSubmit,
                    // onCancel: () => setFiles([])
                  })
                }
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
};
export default UploadModuleForm;
