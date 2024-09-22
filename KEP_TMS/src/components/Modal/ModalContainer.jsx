import {  Modal } from "react-bootstrap";
import proptype from "prop-types";
import { Button } from 'primereact/button';
export const ModalContainer = ({
  variantStyle,
  state,
  close,
  heading,
  body,
  buttonText,
  buttonVariant,
  buttonAction,
  size
}) => {
  const background = variantStyle
    ? variantStyle == "primary"
      ? "theme-bg"
      : "danger"
    : "";
  const color = variantStyle
    ? variantStyle == "primary"
      ? "theme-color"
      : "danger"
    : "";
  return (
    <>
      <Modal show={state} onHide={close} size={size ? size : "md"}>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title className={`h5 ${color}`}>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-0">{body}
        </Modal.Body>
        <Modal.Footer className="border-0">
          
        <Button label="No" icon="pi pi-times" onClick={close} className="p-button-text rounded" />
        <Button label="Yes" icon="pi pi-check" onClick={buttonAction} className="rounded"  />
   
        </Modal.Footer>
      </Modal>
    </>
  );
};
ModalContainer.propTypes = {
  variantStyle: proptype.string,
  heading: proptype.string.isRequired,
  body: proptype.object,
  state: proptype.bool.isRequired,
  close: proptype.func,
  buttonAction: proptype.func,
  buttonText: proptype.string,
  buttonVariant: proptype.string,
};
