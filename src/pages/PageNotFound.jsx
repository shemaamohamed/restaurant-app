import { Button, Col, Container, Image, Row } from "react-bootstrap";
import NotFound from "../assets/page_not_found.svg";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  const imgStyle = {
    width: "700px",
    height: "400px",
    marginTop: "50px",
    marginLeft: "300px",
  };
  return (
    <Container>
      <Row>
        <Col xs={6} md={4}>
          <Image src={NotFound} style={imgStyle} rounded />
        </Col>
      </Row>
      <div className="text-center" style={{ marginTop: "30px" }}>
        <Button className="CartBtn"  onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    </Container>
  );
}

export default PageNotFound;
