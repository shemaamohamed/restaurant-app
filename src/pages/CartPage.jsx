import React from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  setCart,
  updateCartQuantity,
} from "../features/CartSlice";
import { useNavigate } from "react-router-dom";
import CartEmpty from "../components/CartEmpty";

function CartPage() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  function incrementQuantity(product) {
    dispatch(
      updateCartQuantity({ id: product.id, quantity: product.quantity + 1 })
    );
  }

  function decrementQuantity(product) {
    if (product.quantity > 1) {
      dispatch(
        updateCartQuantity({ id: product.id, quantity: product.quantity - 1 })
      );
    } else {
      dispatch(removeFromCart(product));
    }
  }

  function handleDeleteAll() {
    dispatch(setCart([]));
  }

  return (
    <Container>
      <Row className="my-5">
        <Col>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <h3  className="mb-3 text-center text-md-center">Shopping Cart</h3>
            {cart.length > 0 && (
              <Button variant="danger" onClick={() => handleDeleteAll()}>
                Delete All
              </Button>
            )}
          </div>

          {/* Only show the table if there are items in the cart */}
          {cart.length > 0 ? (
            <Table style={{ textAlign: "center" }} responsive="sm" bordered>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product.photoName}
                        alt="food"
                        style={{ width: "100px", marginRight: "10px" }}
                      />
                      <strong>{product.name}</strong> <br />
                    </td>
                    <td>{product.price} EGP</td>
                    <td>
                      <Button
                        onClick={() => decrementQuantity(product)}
                        variant="light"
                        size="sm"
                      >
                        -
                      </Button>
                      <span className="mx-2">{product.quantity}</span>
                      <Button
                        onClick={() => incrementQuantity(product)}
                        variant="light"
                        size="sm"
                      >
                        +
                      </Button>
                      {'  '}
                      <Button
                        variant="outline-danger"
                        className="ml-3"
                        onClick={() => dispatch(removeFromCart(product))}
                      >
                        X
                      </Button>
                    </td>
                    <td>{product.price * product.quantity} EGP</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <CartEmpty />
          )}
        </Col>
      </Row>
      {cart.length > 0 && (
        <Row className="justify-content-end">
          <Col md={4}>
            <h4 className="text-end">Total price: {totalPrice} EGP</h4>
            {!user ? (
              <>
                <Button variant="primary" className="w-100" disabled>
                  Check Out
                </Button>
                <p style={{ textAlign: "center", color: "red" }}>
                  You need to log in first in order to checkout
                </p>
              </>
            ) : (
              <Button
                onClick={() => navigate("/checkout")}
                variant="primary"
                className="w-100"
              >
                Check Out
              </Button>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default CartPage;
