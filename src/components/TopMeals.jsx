import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../style/TopMeals.css";
import CardMelas from "./CardMeals";
import axios from "axios";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItem } from "../features/ItemSlice";

function TopMeals() {
  const dispatch = useDispatch();
  const menuItems = useSelector((state) => state.item.item || []);
  useEffect(() => {
    axios.get('http://localhost:4000/api/food/list') 
      .then(response =>{
        dispatch(setItem(response.data.data))
      })
        
      .catch(error => console.error('Error fetching menu items:', error));
  }, []);
  return (
    <Container className="p-3 mt-3">
      <h1 className="text-center align-middle">Top Meals</h1>
      <Row className="p-3" >
        {menuItems.length > 0 ?(menuItems.map((product) => (
          <Col key={product.id}>
            <CardMelas
              product={product}
              name={product.name}
              description={product.description}
              price={product.price}
              photoName={product.image}
            />
          </Col>
        ))):(
          <p>Loading menu...</p>
        )}
      </Row>
    </Container>
  );
}

export default TopMeals;
