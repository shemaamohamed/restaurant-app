import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addToOrdered, logOrderedItems } from "../features/OrderSlice"; // Redux actions
import { clearCart } from "../features/CartSlice"; // Redux action
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart.cart) || {};
  const items = useSelector((state) => state.item.item) || [];
  const userOrders = useSelector((state) => state.orders.trackedOrdered) || [];
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const cartItems = Object.values(cart);
  // Form state to capture input data
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    streetAddress: "",
    zipCode: "",
    city: "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Calculate total price utility
  const calculateTotalPrice = (cart) => {
    return Object.values(cart).reduce((total, quantity) => total + quantity * cart.price);
  };

  const totalPrice = calculateTotalPrice(cart);

  // Place Order handler
  const handlePlaceOrder = async (e) => {
    e.preventDefault(); 

    if (!user) {
      alert("You need to be logged in to place an order.");
      return;
    }

    if (Object.keys(cart).length === 0) {
      alert("Your cart is empty.");
      return;
    }
    const order = {
      userId: user.id,
      items: cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })), 
      amount: calculateTotalPrice(cart), 
      address: {
        street: formData.streetAddress,
        city: formData.city,
        zip: formData.zipCode, 
      },
    };
    try {
      const response = await axios.post("http://localhost:4000/api/order/place", order, {
        headers: {
          'Content-Type': 'application/json', 
          token:token, 
        },
      });

      // If order is successful
      if (response.status === 201) {
        dispatch(addToOrdered(response.data)); 
        dispatch(clearCart());
        alert("Order placed successfully!");
        navigate("/order-confirmation");
      } else {
        alert("Failed to place the order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
  if (error.response) {
    // Server responded with a status other than 200 range
    alert(`Error: ${error.response.data.message || "There was an error placing your order."}`);
  } else if (error.request) {
    // The request was made but no response was received
    alert("Error: No response from server. Please try again.");
  } else {
    // Something happened in setting up the request that triggered an error
    alert("Error: " + error.message);
  }
    }
  };
  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/order/userorders", {
          headers: {
           token:token,
          },
        });
        response.data.orders.forEach((order) => {
          dispatch(logOrderedItems(order)); 
        });
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    if (token) {
      fetchUserOrders();
    }
  }, [token, dispatch]);

  return (
    <Container style={{ marginTop: '50px' }}>
      <Row className="justify-content-between">
        <Col md={7} className="checkout-form">
          <h3>Checkout</h3>
          <Form onSubmit={handlePlaceOrder}>
            <Row>
              <Col>
                <Form.Group controlId="formFirstName" className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your first name"
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formLastName" className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your last name"
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formStreetAddress" className="mb-3">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your street address"
                required
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formFloor" className="mb-3">
              <Form.Label>zipCode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCity" className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your city"
                required
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" className="place-order-button">
              Place Order
            </Button>
          </Form>
        </Col>
       
        <Col md={4} className="order-summary h-100">
          <h3>Order Summary</h3>
          {Object.keys(cart).length > 0 ? (
            <Table borderless responsive>
              <tbody>
                {Object.entries(cart).map(([itemId, quantity]) => {
                  const product = items.find((item) => item._id === itemId);
                  return product ? (
                    <tr key={itemId}>
                      <td>{quantity} x {product.name}</td>
                      <td>{(product.price * quantity).toFixed(2)} EGP</td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </Table>
          ) : (
            <p>Empty</p>
          )}
          <h6>Total Price: {totalPrice.toFixed(2)} EGP</h6>
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
                {userOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.totalPrice.toFixed(2)} EGP</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No orders yet.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;