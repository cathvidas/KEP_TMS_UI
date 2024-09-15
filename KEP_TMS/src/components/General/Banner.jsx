import { Col, Row } from "react-bootstrap";
import { ActionButton } from "./Button";
import bannerimg from "../../img/banner.png";
import proptypes from "prop-types";

const Banner = ({ showModal, setShowModal }) => {
  const username = sessionStorage.getItem("username");
  const fullname = sessionStorage.getItem("fullname");

  const displayName = () => {
    if (username) {
      return username;
    } else {
      return fullname;
    }
  };

  const handleShow = () => {
    setShowModal(!showModal);
  };

  return (
    <div
      className="rounded-3 mb-3"
      style={{
        background:
          "linear-gradient(0deg, rgba(91,228,155,0.2), rgba(0,167,111,0.2) 99%)",
      }}
    >
      <Row className="gy-4 gy-md-0 w-100">
        <Col className="d-md-flex align-items-md-center col-md-8">
          <div className="p-5">
            <h2 className="fw-bold" style={{ color: "rgb(0,75,80)" }}>
              Welcome back
              <br />
              {displayName()}
            </h2>
            <p className="my-3">
              Enhance your skills with our training programs. Click
              &apos;Request Training&apos; to start or &apos;View All
              Requests&apos; to track your progress.
            </p>
            <ActionButton title="Request Training" onClick={handleShow} />
            <ActionButton
              title="View All Request"
              actionLink="/KEP_TMS/RequestList"
              variant={{ theme: "secondary" }}
            />
          </div>
        </Col>
        <Col className="col-md-4 d-flex align-items-center justify-content-center">
          <div className="m-xl-5 ">
            <img
              className="rounded img-fluid fit-cover"
              style={{ minHeight: "150px", maxHeight: "200px" }}
              src={bannerimg}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};
Banner.propTypes = {
  showModal: proptypes.bool,
  setShowModal: proptypes.func,
};
export default Banner;
