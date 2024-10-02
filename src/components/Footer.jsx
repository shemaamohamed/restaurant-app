import { Col, Row, Stack } from "react-bootstrap";
import "../style/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-black mt-3 content-f ">
      <Stack style={{ textAlign: "center", color: "white" }} gap={4}>
        <div className="p-2">YummY</div>
        <div className="p-1">
          items availability, prices, participation, delivery areas and charges,
          purchase requirements for delivery may vary.
        </div>
        <Row xs={1} md={2} lg={3} xl={4} className="list-f">
          <Col>
            <Link to="/Menue">Menu🍽️</Link>{" "}
          </Col>
          <Col>
            {" "}
            <a href="#Privacy">Privacy🔐</a>
          </Col>
          <Col>
            <Link to="/connect">Contact📞</Link>
          </Col>
          <Col>
            <a href="#FAQs">FAQs 🗣</a>
          </Col>
        </Row>
        <div className="p-1">© 2024 ShimaaMohamed, All rights reserved</div>
      </Stack>
    </div>
  );
}

export default Footer;
