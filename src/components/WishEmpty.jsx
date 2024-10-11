import { Button, Col, Container, Image, Row } from "react-bootstrap";
import emptywishes from "../assets/emptyWishList.svg";
import { useNavigate } from "react-router-dom";

function WishEmpty() {
  const navigate = useNavigate();
  const imgStyle = {
    width: "100%",
    height: "50%",
    margin: "auto",
    marginTop: "100px",
  };
  return (
    <Container
      style={{
        height: "70vh",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Row>
        <Col>
          <Image src={emptywishes} style={imgStyle} rounded />
          <div className="text-center" style={{ marginTop: "30px" }}>
            <Button className="CartBtn" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default WishEmpty;
