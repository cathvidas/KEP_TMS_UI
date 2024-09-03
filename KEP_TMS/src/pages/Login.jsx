
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

  const Login = () => {
    const navigate = useNavigate();
    const handlesubmit = (event)=>{
      event.preventDefault();
      navigate('/Dashboard');
    }

    return (
        <>
          <section
            className="position-relative w-100 d-flex"
            style={{ height: "100vh", background: "#a7d7c5" }}
          >
            <Container className="m-auto">
              <Row className="d-flex justify-content-center">
                <Col className="col-md-6 col-sm-10 col-xl-4 p-0">
                  <Card className="border-0">
                    <CardBody
                      className="d-flex flex-column align-items-center p-4 p-xl-5 py-5 rounded"
                      style={{ background: " #f6fbf9" }}
                    >
                      <Col className="col-md-9 col-xl-6 text-center mx-auto w-100">
                        <img
                          width="200"
                          src="assets/img/13-removebg-preview%201.png"
                          height="43"
                        />
                        <h4 style={{ color: "#2eb396" }}>
                          Training Request System
                        </h4>
                        <p className="w-lg-50">Please log in your credentials</p>
                      </Col>
                      <Form
                        className="text-center w-100"
                        method="post"
                        onSubmit={handlesubmit}
                      >
                        <Form.Group className="mb-3">
                          <Form.Control
                            className="p-3"
                            type="email"
                            name="email"
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
          </section>
        </>
      );
} 
export default Login