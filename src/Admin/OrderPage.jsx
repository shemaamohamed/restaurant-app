import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Accordion,
  Row,
  Col,
  Badge,
  Dropdown,
} from "react-bootstrap";
// import "../style/OrdersAdmin.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeKey, setActiveKey] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // To track the selected order and status

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:4000/api/order/list"
        );
        setOrders(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        "http://localhost:4000/api/order/status",
        {
          orderId: orderId,
          status: newStatus,
        }
      );

      // After successful update, update the local order status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    setSelectedOrder({ orderId, status: newStatus }); // Save the selected order and new status
  };

  useEffect(() => {
    if (selectedOrder) {
      updateOrderStatus(selectedOrder.orderId, selectedOrder.status);
    }
  }, [selectedOrder]);

  const handleToggle = (orderId) => {
    setActiveKey(activeKey === orderId ? null : orderId);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <h1>Orders</h1>

      <Accordion activeKey={activeKey}>
        {orders
          .filter(
            (order) =>
              !(
                (order.address?.firstName === "No" &&
                  order.address?.lastName === "Name") ||
                order.address?.firstName === undefined ||
                order.address?.lastName === undefined
              )
          ) // Filter orders based on the name condition
          .map((order) => (
            <Accordion.Item eventKey={order._id} key={order._id}>
              <Accordion.Header onClick={() => handleToggle(order._id)}>
                <Row className="w-100 align-items-center">
                  <Col md={9} className="d-flex align-items-center">
                    <h4 className="mb-0">
                      {order.address
                        ? `${order.address.firstName} ${order.address.lastName}`
                        : "No name"}
                    </h4>

                    <Dropdown
                      className="mb-2"
                      style={{ marginLeft: "40px" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Dropdown.Toggle
                        variant={
                          order.status === "Delivered" ? "success" : "danger"
                        }
                        id="dropdown-basic"
                      >
                        Status: {order.status}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() =>
                            handleStatusChange(order._id, "Delivered")
                          }
                        >
                          Delivered
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleStatusChange(order._id, "Food Processing")
                          }
                        >
                          Food Processing
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>

                  <Col md={3} className="d-flex flex-column align-items-center">
                    <Badge
                      className="mb-2"
                      style={{
                        backgroundColor: "#73c2fb",
                        fontSize: "large",
                        height: "30px",
                      }}
                    >
                      Date: {new Date(order.date).toLocaleDateString()}
                    </Badge>

                    <Badge bg="secondary" style={{ fontSize: "small" }}>
                      Total Price: {order.amount} EGP
                    </Badge>
                  </Col>
                </Row>
              </Accordion.Header>

              <Accordion.Body>
                <Row style={{ display: "flex" }}>
                  {order.address ? (
                    <div className="userinfo">
                      <h3
                        style={{
                          color: "red",
                          textAlign: "center",
                          backgroundColor: "rgb(255, 208, 0)",
                        }}
                      >
                        User Info
                      </h3>
                      <p className="useraddress">
                        <span style={{ fontWeight: "bold" }}>Address: </span>{" "}
                        {order.address.street}, {order.address.city},{" "}
                        {order.address.state}, {order.address.country}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
                        {order.address ? order.address.email : "No Email"}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>Phone: </span>{" "}
                        {order.address.phone}
                      </p>
                    </div>
                  ) : (
                    <p>No address provided.</p>
                  )}

                  <ul style={{ listStyle: "none" }}>
                    {order.items.map((item) => (
                      <li key={item._id}>
                        <h3
                          style={{
                            color: "red",
                            textAlign: "center",
                            backgroundColor: "rgb(255, 208, 0)",
                          }}
                        >
                          Order Info
                        </h3>
                        <span style={{ fontWeight: "bold" }}>
                          Product Name:{" "}
                        </span>{" "}
                        {item.name} -{" "}
                        <span style={{ fontWeight: "bold" }}>Quantity: </span> :{" "}
                        {item.quantity} -{" "}
                        <span style={{ fontWeight: "bold" }}>Price: </span>{" "}
                        {item.price} EGP {""}
                        <span style={{ fontWeight: "bold" }}>
                          Total Price:{" "}
                        </span>{" "}
                        {order.amount} EGP
                      </li>
                    ))}
                  </ul>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          ))}
      </Accordion>
    </Container>
  );
};

export default OrderList;
