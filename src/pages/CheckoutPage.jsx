import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addToOrdered } from "../features/OrderSlice"; 
import { clearCart } from "../features/CartSlice"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart.cart) || {};
  const items = useSelector((state) => state.item.item) || [];
  const id=localStorage.getItem("id");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const cartItemsid= Object.keys(cart);
  const itemsFiltered= items.filter((item) =>{
    return cartItemsid.includes(item._id);
  })
  const orders = itemsFiltered.map((item) => {
    const quantity = cart[item._id] || 0;
    return {
      name: item.name,
      price: item.price,
      quantity: quantity,
    };
  });
  console.log(orders);
  const totalamountPrice = orders.reduce((acc, item) => acc + item.price * item.quantity, 5);
  const [formData, setFormData] = useState({
    Firstname: "",
    Lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone:  "",
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handlePlaceOrder = async (e) => {
    e.preventDefault(); 


    if (Object.keys(cart).length === 0) {
      alert("Your cart is empty.");
      return;
    }
    const order = {
      userId: id,
      items: orders, 
      amount: totalamountPrice, 
      address: {
        firstName: formData.Firstname,
        lastName: formData.Lastname,
        email: formData.email,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country:  formData.country,
        phone:  formData.phone,
       
      },
      
    };
    console.log(JSON.stringify(order));
    try {
      await axios.post("http://localhost:4000/api/order/place", order, {
        headers: {
            "Content-Type": "application/json",
            "token":token
        },
    }).then((res)=>{
        toast.success("Order placed successfully");
        dispatch(addToOrdered(res.data)); 
        dispatch(clearCart());
        navigate("/");
      });
    }catch (error) {
      toast.error("Error placing order:");
    }


  };

 
  
    


  return (
    <Container style={{ marginTop: '50px' }}>
      <Row className="justify-content-between">
        <Col md={7} className="checkout-form">
          <h3>Checkout</h3>
          <Form onSubmit={handlePlaceOrder}>
            <Row>
              <Col>
                <Form.Group controlId="formFirstname" className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your First Name"
                    required
                    name="Firstname"
                    value={formData.Firstname}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId="formLastname" className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your Last Name"
                    required
                    name="Lastname"
                    value={formData.Lastname}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
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
            <Row>
              <Col md={6}>
                <Form.Group controlId="formCountry" className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
          <Col md={6}>
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
          </Col>
          <Col md={6}>
            <Form.Group controlId="formState" className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your state"
                required
                name="state"
                value={formData.state}
                onChange={handleInputChange}


              />
              </Form.Group>
              </Col>

        </Row>
        <Form.Group controlId="formStreet" className="mb-3">
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your street address"
            required
            name="street"
            value={formData.street}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formZipCode" className="mb-3">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your zip code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        
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
              {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.quantity} x {order.name}</td>
                    <td>{(order.price * order.quantity).toFixed(2)} EGP</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>Empty</p>
          )}
          <hr />
          <div style={{display:'flex' ,flexDirection:"column" ,alignItems:'flex-end' ,justifyContent:'center'}}>
          <h6 >Subtotal: {((totalamountPrice-5)).toFixed(2)} EGP</h6>
          <h6>Delivery Price: 5 EGP</h6>
          <h6>Total Price: {totalamountPrice.toFixed(2)} EGP</h6>

          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;