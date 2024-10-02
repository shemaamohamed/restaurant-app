import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import emptycart from "../assets/cartempty.png";

function CartEmpty() {
  const navigate = useNavigate();
  const imgStyle = {
    width: "700px",
    height: "400px",
    marginTop: "20px",
    marginLeft: "300px",
  };
  return (
    <Container>
      <Row>
        <Col xs={6} md={4}>
          <Image src={emptycart} style={imgStyle} rounded />
        </Col>
      </Row>
      <div className="text-center" style={{ marginTop: "30px" }}>
        <Button variant="outline-primary" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    </Container>
  );
}

export default CartEmpty;
