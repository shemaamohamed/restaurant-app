import React, { useEffect } from "react";
import { Container, Row, Col, Button, Form, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CartEmpty from "../components/CartEmpty";
import "../style/CheckoutPage.css";
import { logOrderedItems } from "../features/OrderSlice";
function CheckoutPage() {
  const cart = useSelector((state) => state.cart.cart) || {};
  const items = useSelector((state) => state.item.item) || [];
  const userOrders = useSelector((state) => state.orders.trackedOrdered) || []; 
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
useEffect(()=>{

const fetchUserOrders =async () => {
  try{
   const response = await axios.get("http://localhost:4000/api/order/userorders",{  
      headers:{
        token:token,
      }
    ,
   });
        response.data.orders.forEach(order => {
       dispatch(logOrderedItems(order));
       });
     } catch (error) {
     console.error("Error fetching user orders:", error);
    }
}},token);


  const totalPrice = Object.entries(cart).reduce((acc, [itemId, quantity]) => {
    const product = items.find(item => item._id === itemId);
    return acc + (product ? product.price * quantity : 0);
  }, 0);
  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    const orderDetails = {
      items: Object.entries(cart).map(([itemId, quantity]) => ({ itemId, quantity })),
      totalPrice,
    };

    try {
      await axios.post("http://localhost:4000/api/order/place", orderDetails, {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      alert("Order placed successfully!");
      navigate("/order-confirmed");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <Container style={{ marginTop: '50px' }}>
      <Row>
        <Col md={8} className="checkout-form">
          <h3>Checkout</h3>
          <Form onSubmit={handlePlaceOrder}>
            <Row>
              <Col>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your first name" required defaultValue={user?.firstName} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your last name" required defaultValue={user?.lastName} />
                </Form.Group>
              </Col>
            </Row>

            <h2>Delivery Address</h2>
            <Form.Group controlId="formStreetAddress">
              <Form.Label>Street Address</Form.Label>
              <Form.Control type="text" placeholder="Enter your street address" required />
            </Form.Group>
            <Form.Group controlId="formFloor">
              <Form.Label>Floor (Optional)</Form.Label>
              <Form.Control type="text" placeholder="Enter your floor" />
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Enter your city" required />
            </Form.Group>

            <h2>Contact Information</h2>
            <Row>
              <Col>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" required defaultValue={user?.email} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="tel" placeholder="Enter your phone number" required defaultValue={user?.phone} />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="place-order-button">
              Place Order
            </Button>
          </Form>
        </Col>

        <Col md={4} className="order-summary">
          <h3>Order Summary</h3>
          {Object.keys(cart).length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(cart).map(([itemId, quantity]) => {
                  const product = items.find(item => item._id === itemId);
                  return product ? (
                    <tr key={itemId}>
                      <td>{product.name}</td>
                      <td>{quantity}</td>
                      <td>{(product.price * quantity).toFixed(2)} EGP</td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </Table>
          ) : (
            <CartEmpty />
          )}
          <h5>Total Price: {totalPrice.toFixed(2)} EGP</h5>
          <h4>User Orders</h4>
          {userOrders.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Total Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {userOrders.map(order => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.totalPrice.toFixed(2)} EGP</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p></p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default CheckoutPage;
