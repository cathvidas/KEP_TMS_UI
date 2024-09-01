import { Col, Row } from "react-bootstrap";

const Banner = () => {
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
            <h2 className="fw-bold" style={{color: 'rgb(0,75,80)'}}>
              Welcome back
              <br />
              USERNAME
            </h2>
            <p className="my-3">
              Enhance your skills with our training programs. Click 'Request
              Training' to start or 'View All Requests' to track your progress.
            </p>
            <a
              className="btn brand-btn btn-lg me-2"
              role="button"
              href="#"
              style={{background: '#00a76f;border-color: #00a76f'}}
              data-bs-toggle="modal"
              data-bs-target="#TRtype"
            >
              Request Training
            </a>
            <a
              className="btn btn-lg"
              role="button"
              href="#"
              style={{background: '#f6fbf9;color: #066337'}}
            >
              View Request
            </a>
          </div>
        </Col>
        <Col className="col-md-4">
          <div className="m-xl-5">
            <img
              className="rounded img-fluid fit-cover"
              style={{ minHeight: "150px" }}
              src="assets/img/personal%201.png"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Banner;
