import { Card } from "react-bootstrap";
import SideBar from "../components/SideBar";
import LoveIcon from "../components/LoveIcon";
import "../style/SideBar.css";
import {
  updateCartQuantity,
} from "../features/CartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
function CheckoutPage() {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const incrementQuantity = (index) => {
    const updatedItem = { ...cart[index], quantity: cart[index].quantity + 1 };
    dispatch(updateCartQuantity(updatedItem));
  };

  const decrementQuantity = (index) => {
    if (cart[index].quantity > 1) {
      const updatedItem = { ...cart[index], quantity: cart[index].quantity - 1 };
      dispatch(updateCartQuantity(updatedItem));
    }
  };

  return (
    <div>
      <div className="container" style={{'marginTop':'30px'}}>
        <div className="row">
          <div className="col-sm-9">
            <div className="row">
              {cart.map((item, index) => (
                <div className="col-sm-4" key={item.id}>
                  <Card className="card-s">
                    <Card.Img
                      variant="top"
                      src={item.photoName} 
                      style={{ height: "200px" }}
                    />
                    <Card.Body>
                      <Card.Title className="card-t">
                        {item.name} <LoveIcon />
                      </Card.Title>
                      <hr />
                      <Card.Text style={{ height: "50px" }}>
                        {item.description}
                      </Card.Text>
                      <Card.Text className="card-text">
                        Price: {item.price} EGP
                        <hr />
                        <div className="quantity-controls">
                          <button
                            onClick={() => decrementQuantity(index)}
                            className="quantity-btn"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => incrementQuantity(index)}
                            className="quantity-btn"
                          >
                            +
                          </button>
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="col-sm-3">
            <SideBar />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default CheckoutPage;
