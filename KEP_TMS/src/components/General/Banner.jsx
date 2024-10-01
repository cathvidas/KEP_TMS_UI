import { Col, Row } from "react-bootstrap";
import { ActionButton } from "./Button";
import bannerimg from "../../img/banner.png";
import proptypes from "prop-types";

const Banner = ({ setShowModal }) => {
  const username = sessionStorage.getItem("username");
  const fullname = sessionStorage.getItem("fullname");

  const displayName = () => {
    if (username) {
      return username;
    } else {
      return fullname;
    }
  };


  return (
    <div
      className="rounded-3 mb-3 card shadow-sm"
      style={{
        background:
          "linear-gradient(0deg, rgba(91,228,155,0.2), rgba(0,167,111,0.2) 99%)",
          borderColor: "var(--theme-color)"
      }}
    >
      <Row className="gy-4  gy-md-0 w-100 ">
        <Col className="d-md-flex align-items-md-center col-md-8">
          <div className="px-5">
            <h3 className="fw-bold" style={{ color: "rgb(0,75,80)" }}>
              Welcome back  {displayName()}
            </h3>
            <p className="my-3">
               Click
              &apos;Request Training&apos; to request new training or &apos;View All
              Requests&apos; to track your training request progress.
            </p>
            <ActionButton title="Request Training" onClick={setShowModal} 
              variant={{size: "btn-xl" }} />
            <ActionButton
              title="View All Request"
              actionLink="/KEP_TMS/RequestList"
              variant={{ theme: "secondary",size: "btn-xl" }}
            />
          </div>
        </Col>
        <Col className="col-md-4 d-flex align-items-center justify-content-center">
          <div className="m-xl-4 ">
            <img
              className="rounded img-fluid fit-cover"
              style={{ minHeight: "100px", maxHeight: "150px" }}
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
