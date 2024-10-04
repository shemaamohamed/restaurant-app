import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import emptycart from "../assets/empty_cart.svg";
// import'../style/TopMeals.css'

function CartEmpty() {
  const navigate = useNavigate();
  const imgStyle = {
    width: "100%",
    height: "50%",
    margin: "auto",
    marginTop: "100px",
  };
  return (
    <Container style={{height:'70vh',alignItems:'center',display:'flex',justifyContent:'center',flexDirection:'column'}}>
    <Row>
      <Col >
        <Image src={emptycart} style={imgStyle} rounded />
        <div className="text-center" style={{ marginTop: "30px" }}>
          <Button className="CartBtn"  onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </Col>
    </Row>
  </Container>
  );
}

export default CartEmpty;
