import { useState, useEffect } from "react";
import { Container, Stack, Table, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8000/product");
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  if (loading) {
    return (
      <Container className="text-center" style={{ marginTop: "20px" }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center" style={{ marginTop: "20px" }}>
        <Alert variant="danger">Error fetching orders: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: "20px" }}>
      <Stack
        direction="horizontal"
        className="mb-4"
        style={{ justifyContent: "space-between" }}
      >
        <h1>Orders</h1>
      </Stack>

      <Table responsive>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Total Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.orderId}</td>
              <td>{order.customerName}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>{order.price} EGP</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default OrderPage;
