import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../style/TopMeals.css";
import CardMelas from "./CardMeals";
import productData from "../../src/product.json";

function TopMeals() {
  console.log(productData);
  return (
    <Container className="p-3 mt-3">
      <h1>Top Meals</h1>
      <Row>
        {productData.product.map((product) => (
          <Col key={product.id} >
            <CardMelas
              product={product}
              name={product.name}
              description={product.description}
              price={product.price}
              photoName={product.photoName}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default TopMeals;
