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
import { useState } from "react";
import { Toast } from "../components/SweetToast";

const Login = () => {
  const navigate = useNavigate();

  const [badge, setBadge] = useState("");
  const [password, setPassword] = useState("");

  // response variables
  var unauthorized = 401;

  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      axios
        .post("http://localhost:5030/api/Users/Login", {
          employeeId: e.target.badge.value,
          password: e.target.password.value,
        })
        .then((res) => {
          if (res.data.status === unauthorized) {
            Toast.fire({
              icon: "error",
              title: res.data.message,
            });
          }
          console.log(res);

          if (res.data.isSuccess === true) {
            const response = res.data;
            console.log(response.data);
            sessionStorage.setItem("fullname", response.data.fullname);
            sessionStorage.setItem("username", response.data.username);
            sessionStorage.setItem("firstname", response.data.firstname);
            sessionStorage.setItem("lastname", response.data.lastname);
            sessionStorage.setItem("token", response.token);
            navigate("/KEP_TMS/Dashboard");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.code === "ERR_NETWORK") {
            Toast.fire({
              icon: "error",
              title: err.message,
            });
          } else {
            Toast.fire({
              icon: "error",
              title: err,
            });
          }
        });
    }
  };

  const validate = () => {
    let result = true;
    if (
      (badge === "" || badge === null) &&
      (password === "" || password === null)
    ) {
      result = false;
      Toast.fire({
        icon: "warning",
        title: "Please Enter Credentials",
      });
    } else if (badge === "" || badge === null) {
      result = false;
      Toast.fire({
        icon: "warning",
        title: "Please Enter Your Badge",
      });
    } else if (password === "" || password === null) {
      result = false;
      Toast.fire({
        icon: "warning",
        title: "Please Enter Password",
      });
    }
    return result;
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
                        value={badge}
                        onChange={(e) => setBadge(e.target.value)}
                        placeholder="Employee Badge"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        className="p-3"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Button
                        className="d-block w-100 p-3"
                        type="submit"
                        style={{
                          background: "#2eb396",
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
