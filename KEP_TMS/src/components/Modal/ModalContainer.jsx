import { Button, Modal } from "react-bootstrap";
import proptype from "prop-types";
export const ModalContainer = ({
  variantStyle,
  state,
  close,
  heading,
  body,
  buttonText,
  buttonVariant,
  buttonAction,
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
      <Modal show={state} onHide={close}>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title className={`h5 ${color}`}>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-0">{body}
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          <Button
            variant={buttonVariant ? buttonVariant : "primary"}
            className={background + " filter-hover"}
            onClick={buttonAction}
          >
            {buttonText}
          </Button>
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
