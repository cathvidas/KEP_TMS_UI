import { Button } from "primereact/button";
import { Form, Modal, Row } from "react-bootstrap";
import { FormFieldItem } from "../../trainingRequestFormComponents/FormElements";
import { useRef, useState } from "react";
import proptype from "prop-types";
import { FileUpload } from "primereact/fileupload";

const UploadQuestionsForm = ({ showModal, handleClose, onSubmit }) => {
  const [error, setError] = useState();
  const [examItems, setExamItems] = useState([]);
  const handleUpload = () => {
    const mappedIItems = examItems.map((item) => {
      return {
        content: item.question,
        answerOptions: item.options.map((opt, index)=>{
          return {
            content: opt,
            isCorrect: index === parseInt(item.answer) - 1 
          }
        }),
      };
    })
    onSubmit(mappedIItems);
    setExamItems([]);
    handleClose();
  };
  const fileUploadRef = useRef();
  const handleOnChange = (e) =>{
    const file = e?.files;
    extractFile(file);
  }
  function splitCSVRow(csvRow) {  
    // This regex splits the CSV based on commas not inside quotes  
    const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;  
    return csvRow.split(regex).map(item => item.trim().replace(/^"|"$/g, '')); // Remove external quotes and spaces  
}   


  const extractFile = (files)=>{
    const file = files[0];
    setError(null);
    if ("text/csv" !== file.type) {
      setError("Invalid file type. Please refer to the given template.");
      fileUploadRef.current?.setFiles([]);
      return;
    }
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split("\n");
      let exams = [];
      rows.slice(1).map((row) => {
        const cols = splitCSVRow(row);
        if(!cols[0]) return;
        let item = {};
        item.question = cols[0];
        item.answer = cols[1];
        item.options = cols.slice(2);
        exams.push(item);
      });
      setExamItems(exams);
    };
    reader.readAsText(file); // Reads the file as text
  }
  return (
    <>
      {" "}
      <Modal show={showModal} onHide={handleClose} size={"lg"}>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title className={`h5 theme-color`}>
            Upload Questions
          </Modal.Title>
        </Modal.Header>
        <Form
        // className={validated && "was-validated"}
        >
          <Modal.Body className="py-0">
            <Row className="">
              <FormFieldItem
                label="Select File"
                subLabel={"(csv file only)"}
                col={"col-12"}
                error={error ?? ""}
                FieldComponent={
                  <FileUpload
                  
                    ref={fileUploadRef}
                    cancelLabel="Clear"
                    customUpload
                    onSelect={handleOnChange}
                    uploadOptions={{className: 'd-none'}}
                    emptyTemplate={
                      <p className="m-0">
                        Drag and drop file here to upload.
                      </p>
                    }
                  />
                }
              />
              <p className="text-success fw-bold">{examItems?.length > 0 && examItems?.length + " Items Found"}</p>
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
              type="button"
              label={"Upload"}
              className="rounded"
              onClick={handleUpload}
            />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
UploadQuestionsForm.propTypes = {
  showModal: proptype.bool,
  handleClose: proptype.func,
  onSubmit: proptype.func,
};
export default UploadQuestionsForm;
