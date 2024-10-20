import axios from "axios";
import { Container, Table } from "react-bootstrap";
import { addToOrdered } from "../features/OrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const UserorderPage = () => {
  const id = localStorage.getItem("id");
  const dispatch = useDispatch();
  const userOrders = useSelector((state) => state.orders.trackedOrdered) || [];

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios({
          method: "get",
          url: "http://localhost:4000/api/order/userorders",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          data: { userId: id },
        });

        response.data.data.forEach((order) => {
          dispatch(
            addToOrdered({
              amount: order.amount,
              status: order.status,
              _id: order._id,
            })
          );
        });
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };
    setInterval(() => {
      fetchUserOrders();
    }, 1000);
  }, [dispatch]);

  return (
    <Container>
      {userOrders.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              {/* <th>Order ID</th> */}
              <th>Status</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.map((order, index) => (
              <tr key={`${order.orderId}`}>
                {/* <td>{order.orderId}</td> */}
                <td>{order.status}</td>
                <td>{order.amount} EGP</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No orders yet.</p>
      )}
    </Container>
  );
};

export default UserorderPage;
