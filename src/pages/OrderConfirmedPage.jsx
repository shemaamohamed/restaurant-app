import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import orderImage from "../assets/Na_Dec_27.jpg"; 

function OrderConfirmedPage() {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/"); 
  };
  return (
    <Container className="text-center my-5">
      <Row>
        <Col>
          <h1 className="mb-4">Order Placed!</h1>
          <img
            src={orderImage}
            alt="Order Confirmed"
            style={{ width: "300px", height: "300px" }}
          />
          <div className="mt-4">
            <Button variant="primary" onClick={handleBackToHome}>
              Back to Home
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default OrderConfirmedPage;
