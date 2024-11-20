import { Col, Row } from "react-bootstrap";
import bannerimg from "../../img/banner.png";
import proptypes from "prop-types";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { SessionGetRole } from "../../services/sessions";
import { UserTypeValue } from "../../api/constants";

const Banner = ({ setShowModal }) => {
  const fullname = sessionStorage.getItem("fullname");
  const navigate = useNavigate();

  const displayName = () => {
    return fullname;
  };

  return (
    <div
      className="rounded-3 py-3 mb-3 card shadow-sm"
      style={{
        background:
          "linear-gradient(0deg, rgba(91,228,155,0.2), rgba(0,167,111,0.2) 99%)",
        borderColor: "var(--theme-color)",
      }}
    >
      <Row className="gy-4  gy-md-0 w-100 ">
        <Col className="d-md-flex align-items-md-center col-12 col-md-8">
          <div className="px-5">
            <h3 className="fw-bold" style={{ color: "rgb(0,75,80)" }}>
              Good Day, {displayName()}
            </h3>
            {(SessionGetRole() === UserTypeValue.ADMIN || SessionGetRole() === UserTypeValue.SUPER_ADMIN || SessionGetRole === UserTypeValue.REQUESTOR ) ?<>
            <p className="my-3">
              Click &apos;Request Training&apos; to request new training or
              &apos;View All Requests&apos; to track your training request
              progress.
            </p>
            <div className="flex gap-2 flex-wrap">
              <Button
                type="button"
                className="theme-bg rounded py-1"
                label="Request Training"
                onClick={() => setShowModal(true)}
                variant={{ size: "btn-xl" }}
              />
              <Button
                type="button"
                label="View All Request"
                className="theme-secondary rounded py-1"
                style={{ borderColor: "transparent" }}
                onClick={() => navigate("/KEP_TMS/RequestList")}
                variant={{ theme: "secondary", size: "btn-xl" }}
              />
            </div></> : <p>Explore Your Training Dashboard and Get Started!</p>
            }
          </div>
        </Col>
        <Col className="col-md-4 d-flex align-items-center justify-content-center d-none d-md-bloack">
          <img
            className="rounded img-fluid fit-cover"
            style={{ minHeight: "100px", maxHeight: "150px" }}
            src={bannerimg}
          />
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
