import React, { useState } from "react";
import "../style/Login.css";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/AuthSlice";
import toast from "react-hot-toast";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simulating API call for login
      // Replace this with  API call
      const user = { email, password, _id: "32424" };
      dispatch(login(user));
      toast.success("Successfully logged in!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
      toast.error("Login failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Container>
      <Row sm={1} md={2} xl={3}>
        <Col style={{ margin: "auto" }}>
          <Form
            style={{
              paddingTop: "0px",
              margin: "auto",
              backgroundColor: "#fff",
              padding: "30px",
              marginTop: "50px",
            }}
            onSubmit={handleSubmit}
          >
            <div className="header-l">
              <div className="text-l">Login</div>
              <div className="underline"></div>
            </div>
            <Form.Group>
              <div className="inputs-l">
                <InputGroup className="mb-3">
                  <InputGroup.Text id="email-addon">
                    <img
                      src={email_icon}
                      alt="Email Icon"
                      style={{ width: "20px" }}
                    />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Enter your E-mail"
                    aria-label="Email"
                    aria-describedby="email-addon"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text id="password-addon">
                    <img
                      src={password_icon}
                      alt="Password Icon"
                      style={{ width: "20px" }}
                    />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Enter your Password"
                    aria-label="Password"
                    aria-describedby="password-addon"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </InputGroup>

                {/* Display error message if exists */}
                {error && <div className="text-danger mb-2">{error}</div>}

                <div className="forgot-password">
                  Forgot Password? <span>Click Here</span>
                </div>

                <div className="submit-container">
                  <Button
                    className="submit gray"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Log in"}
                  </Button>
                  <Button
                    className="submit"
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </Button>
                </div>
              </div>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginFormPage;
