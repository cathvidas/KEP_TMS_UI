import "../assets/css/login.css"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  // Button,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../img/Knowles_Green.png";
import { useState } from "react";
import validateLogin from "../utils/LoginValidation";
import handleUserLogin from "../services/loginServices";
import { APP_DOMAIN } from "../api/constants";
import { Button } from "primereact/button";

const Login = () => {
  const navigate = useNavigate();

  const [badge, setBadge] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
 const location = useLocation();
  // response variables

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateLogin(badge, password)) {
      var data = {
        employeeId: e.target.badge.value,
        password: e.target.password.value,
      }
      setLoading(true);
      var res = await handleUserLogin(data);
      setLoading(false);
      if(res){
        if(location.pathname === APP_DOMAIN){
          navigate("/KEP_TMS/Dashboard");
        }
        else{
          navigate()}
      }
    }
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
                    <p className="w-lg-50 mb-3">Please log in your credentials</p>
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
                    <Form.Group className="mb-3 position-relative">
                      <Form.Control
                        className="p-3 pe-5"
                        type={showPass ? "text":"password"}
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                      />
                      <Button type="button" icon={showPass ? "pi pi-eye": "pi pi-eye-slash"} onClick={()=>setShowPass(!showPass)} className="position-absolute top-0 focus-invisible end-0 p-3 " severity="secondary" text/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Button
                        className="d-block w-100 p-3 rounded"
                        type="submit"
                        style={{
                          background: "#2eb396",
                          borderColor: "var(--bs-btn-disabled-color)",
                        }}
                        onSubmit={handleLogin}
                      >
                        <strong>{loading === true ? <i className="pi pi-spin pi-spinner"></i> : "Login"}</strong>
                      </Button>
                    </Form.Group>
                    {/* <p className="text-muted m-0">Forgot your password?</p> */}
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
