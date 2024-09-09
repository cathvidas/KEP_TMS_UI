import {
  faBuildingCircleArrowRight,
  faBuildingCircleCheck,
  faIcons,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Row } from "react-bootstrap";
import proptype from "prop-types";
import { useState } from "react";
const StatusCard = ({ variant, placeholder, value }) => {
  
    const background = variant == "success" ? "bg-success" : variant == "danger"? "bg-danger": variant == "warning" ? "bg-warning" : "bg-light";


  return (
    <>
      <Card className={`col-3 p-2  ${background}`}>
        <div className="d-flex align-items-center px-2 gap-2">
          <div
            className="bg-white ratio rounded-circle text-muted ratio-1x1 p-2"
            style={{ width: "40px" }}
          >
            <span className="d-flex align-items-center justify-content-center">
              <FontAwesomeIcon icon={faIcons} />
            </span>
          </div>
          <h5 className="m-0">{placeholder}</h5>
        </div>
        <Row className="bg-white text-muted p-2 mt-2 rounded mx-2">
          <Col>
            <div className="d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faBuildingCircleCheck} />
              <h5 className="m-0">{value && value?.internal}</h5>
            </div>
          </Col>
          <Col className="border-start">
            <div className="d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faBuildingCircleArrowRight} />
              <h5 className="m-0">{value && value?.external}</h5>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};
StatusCard.propTypes = {
  variant: proptype.oneOf([
    "success",
    "danger",
    "warning",
    "info",
    "primary",
    "secondary",
  ]),
  placeholder: proptype.string.isRequired,
  value: proptype.object,
};
export default StatusCard;
