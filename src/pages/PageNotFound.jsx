import { Button, Col, Container, Image, Row } from "react-bootstrap";
import NotFound from "../assets/page_not_found.svg";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  const imgStyle = {
    width: "100%",
    height: "70%",
    margin: "auto",
    marginTop: "100px",
    
    
  };
  return (
    <Container style={{height:'70vh',alignItems:'center',display:'flex',justifyContent:'center',flexDirection:'column'}}>
      <Row>
        <Col >
          <Image src={NotFound} style={imgStyle} rounded />
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

export default PageNotFound;
