import React, { useState } from "react";
import "../style/Login.css";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signUp } from "../features/AuthSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

function SignUpFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange=async(e)=>{

    setUser({...user,[e.target.name]:e.target.value})

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    setLoading(true); // Set loading state to true

    try {
      axios.post('http://localhost:4000/api/user/register',user).then((res)=>{
        console.log(res.data)
        dispatch(signUp(user));

      setTimeout(() => {
        toast.success("User created successfully!");
        navigate("/");
      }, 1000);

      }).catch((error)=>{
        setError(error.response ? error.response.data.message : error.message);
        toast.error(
          error.response ? error.response.data.message : "Signup failed."
        );
      })

      
    } finally {
      setLoading(false); // Reset loading state
    }
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
            onSubmit={handleSubmit} // Set onSubmit to handle the form submission
          >
            <div className="header-l">
              <div className="text-l">Sign Up</div>
              <div className="underline"></div>
            </div>
            <Form.Group>
              <div className="inputs-l">
                {/* Name Input */}
                <InputGroup className="mb-3">
                  <InputGroup.Text id="name-addon">
                    <img
                      src={user_icon}
                      alt="Name Icon"
                      style={{ width: "20px" }}
                    />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter your Name"
                    aria-label="Name"
                    aria-describedby="name-addon"
                    value={user.name}
                    name="name"
                    onChange={handleChange}
                    required
                  />
                </InputGroup>

                {/* Email Input */}
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
                    value={user.email}
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </InputGroup>

                {/* Password Input */}
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
                    value={user.password}
                    name="password"
                    onChange={handleChange}
                    required
                  />
                </InputGroup>

                {/* Display error message if it exists */}
                {error && <div className="text-danger mb-2">{error}</div>}

                {/* Submit Buttons */}
                <div className="submit-container">
                  <Button
                    className="submit gray"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Signing Up..." : "Sign Up"}{" "}
                    {/* Button text changes based on loading state */}
                  </Button>
                  <Button className="submit" onClick={() => navigate("/login")}>
                    Login
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

export default SignUpFormPage;
