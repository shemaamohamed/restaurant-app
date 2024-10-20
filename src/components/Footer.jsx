import { Col, Row, Stack } from "react-bootstrap";
import "../style/Footer.css";
import { Link } from "react-router-dom";
import Logo from "../assets/icon-food.svg"


function Footer() {
  return (
    <div className="bg-white mt-3 content-f ">
      <Stack style={{ textAlign: "center", color: "white" }} gap={3}>
        <div className="p-2 text-black">YummY 
        <img
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            style={{ marginLeft: "5px" }}
            alt=""
          />
        </div>
        <div className="p-1 text-black">
          items availability, prices, participation, delivery areas and charges,
          purchase requirements for delivery may vary.
        </div>
        <Row xs={1} md={3} lg={4} className="list-f">
          <Col>
            <Link to="/Menue">Menu🍽️</Link>{" "}
          </Col>
          <Col>
            <Link to="/ordert"> Orders 🧾</Link>
          </Col>
          <Col>
            <Link to="/connect">Contact📞</Link>
          </Col>
          
        
        </Row>
        <div className="p-1 text-black">© 2024 ShimaaMohamed, All rights reserved</div>
      </Stack>
    </div>
  );
}

export default Footer;
