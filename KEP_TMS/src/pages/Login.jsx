import "../assets/css/login.css"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../img/logo-hd.png";
import { useState } from "react";
import validateLogin from "../utils/LoginValidation";
import handleUserLogin, { handleSetPassword } from "../services/loginServices";
import { APP_DOMAIN } from "../api/constants";
import { Button } from "primereact/button";
import ErrorTemplate from "../components/General/ErrorTemplate";
import { Toast } from "../components/SweetToast";

const Login = () => {
  const navigate = useNavigate();
  const [badge, setBadge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [settingPass, setSettingPass] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
 const location = useLocation();
  // response variables
  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateLogin(badge, password)) {
      var data = {
        employeeId: e.target.badge.value?.trim(),
        password: e.target.password.value,
      }
      setLoading(true);
      var res = await handleUserLogin(data);
      setLoading(false);
      if(res?.status === 201){
        setSettingPass(true);
        setPassword("");
        setConfirmPassword("");
      } else if(res){
        if(location.pathname === APP_DOMAIN || location.pathname === APP_DOMAIN + "/"){
          navigate("/KEP_TMS/Dashboard");
        }
        else{
          navigate()}
      }
    }
  };
  const handleSettingPass = async (e) => {
    e.preventDefault();
    validateLogin(badge, password, true)
    if(!password || !confirmPassword || !badge){
      Toast.fire({
        icon: "warning",
        title: "Please fill all the fields",
      })
      return;}
    if (password != confirmPassword) {
          Toast.fire({
            icon: "warning",
            title: "Password and confirm password does not match",
          });
      return;
    }
    const setPassData = {
      employeeBadge: badge,
      password: password,
    }
    const res = await handleSetPassword(setPassData);
    if(res){
      setSettingPass(false);
      setPassword("");
      setConfirmPassword("");
      setBadge("");
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
                  <Col className="col-md-12 text-center mx-auto w-100">
                    <img width="250" src={logo} height="" />
                    <h4 className="theme-color fw-bold" >
                      HR Training System
                    </h4>
                  </Col>
                  <Form
                    className="text-center w-100"
                    method="post"
                    onSubmit={settingPass ? handleSettingPass : handleLogin}
                  >
                    <p className="w-lg-50 mb-3">{settingPass ? "Enter badge and your desired password.": "Please log in with your credentials."}</p>
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
                    {settingPass && 
                    <Form.Group className="mb-3 position-relative">
                      <Form.Control
                        className="p-3 pe-5"
                        type={showConfirmPass ? "text":"password"}
                        name="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                      />
                      <Button type="button" icon={showConfirmPass ? "pi pi-eye": "pi pi-eye-slash"} onClick={()=>setShowConfirmPass(!showConfirmPass)} className="position-absolute top-0 focus-invisible end-0 p-3 " severity="secondary" text/>
                    </Form.Group>}
                    <Form.Group className="mb-3">
                      <Button
                        className="d-block w-100 p-3 rounded"
                        type="submit"
                        style={{
                          background: "#2eb396",
                          borderColor: "var(--bs-btn-disabled-color)",
                        }}
                      >
                        <strong>{loading === true ? <i className="pi pi-spin pi-spinner"></i> : settingPass ? "Set Password" : "Login"}</strong>
                      </Button>
                    </Form.Group>
                    {settingPass &&
                    <Button type="button" className="text-muted m-0 py-0" text label={settingPass ? "Back to Login":"Set Password?"} onClick={()=>setSettingPass(!settingPass)}/>
                  }</Form>
                  
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
