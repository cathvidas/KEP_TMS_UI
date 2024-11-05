import proptype from "prop-types"
import { Modal } from "react-bootstrap";
import { FormFieldItem } from "../trainingRequestFormComponents/FormElements";
import { Button } from "primereact/button";
import { useState } from "react";
const CommentBox = ({header,label, description,placeholder, onSubmit, show, onClose, confirmButton}) => {
    const [annotation, setAnnotation] = useState("")
    const [error, setError] = useState("")
    const verify = () => {
      if (annotation.trim() === "") {
        setError("This field is required");
      } else {
        setError("");
        onSubmit(annotation)
      }
    };
    return (
      <>
        <Modal show={show} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title className="theme-color h5">{header}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="py-0 pt-2">
            <p className="mb-2">{description}</p>
            <FormFieldItem
              label={label}
              required
              val
              error={error}
              FieldComponent={
                <textarea
                  className="form-control"
                  rows={8}
                  value={annotation}
                  onChange={(e) => setAnnotation(e.target.value)}
                  placeholder={placeholder ?? "Start writing here.."}
                ></textarea>
              }
            />
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button
              type="button"
              className="rounded text-muted"
              size="small"
              text
              onClick={onClose}
              label="Cancel"
            />
            <Button
              type="button"
              className="rounded"
              size="small"
              severity={confirmButton?.severity ?? "danger"}
              icon={confirmButton?.icon}
              onClick={verify}
              label={confirmButton?.label ?? "Submit"}
            />
          </Modal.Footer>
        </Modal>
      </>
    );
}
CommentBox.propTypes = {
    header: proptype.string,
    description: proptype.string,
    onSubmit: proptype.func,
    label: proptype.string,
    placeholder: proptype.string,
    show: proptype.bool,
    onClose: proptype.func,
    confirmButton: proptype.shape({
        label: proptype.string,
        severity: proptype.string,
        icon: proptype.string
    })
}
export default CommentBox;