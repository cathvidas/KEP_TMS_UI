import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5030/api/Users/Login", {
        employeeId: e.target.badge.value,
        password: e.target.password.value,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/KEP_TMS/Dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <section
        className="position-relative w-100 min-vh-100 d-flex overflow-hidden"
        style={{ height: "100%", background: "#a7d7c5" }}
      >
        <div className="login-bg opacity-25 left"></div>
        <Container className="m-auto z-1">
          <Row className="d-flex justify-content-center">
            <Col className="col-md-6 col-sm-10 col-xl-4 p-0">
              <Card className="border-0">
                <CardBody
                  className="d-flex flex-column align-items-center p-4 p-xl-5 py-5 rounded"
                  style={{ background: " #f6fbf9" }}
                >
                  <Col className="col-md-9 col-xl-6 text-center mx-auto w-100">
                    <img width="200" src={logo} height="" />
                    <h4 style={{ color: "#2eb396" }}>
                      Training Management System
                    </h4>
                    <p className="w-lg-50">Please log in your credentials</p>
                  </Col>
                  <Form
                    className="text-center w-100"
                    method="post"
                    onSubmit={handleLogin}
                  >
                    <Form.Group className="mb-3">
                      <Form.Control
                        className="p-3"
                        type="text"
                        name="badge"
                        placeholder="Username or User Id"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        className="p-3"
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Button
                        className="d-block w-100 p-3"
                        type="submit"
                        style={{
                          background: "#84c7ae",
                          borderColor: "var(--bs-btn-disabled-color)",
                        }}
                        onSubmit={handleLogin}
                      >
                        <strong>Login</strong>
                      </Button>
                    </Form.Group>
                    <p className="text-muted m-0">Forgot your password?</p>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="login-bg opacity-25 right"></div>
      </section>
    </>
  );
};
export default Login;
