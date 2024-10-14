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
  const items =useSelector((state) => state.item.item);
  console.log(cart);
  console.log(items);
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
      <div className="container" style={{'marginTop':'30px'}}>
        <div className="row">
          <div className="col-sm-9">
            <div className="row">
              {Object.entries(cart).map(([itemId, quantity]) => {
                const item = items.find((item) => item._id === itemId);
                if (item) {
                  return (
                          <div className="col-sm-3">
                          <SideBar item={item} quantity={quantity} />
                          </div>
                  );
                }
                return  null;
              }
              
                
              )}
            </div>
          </div>

          
      </div>
      <Outlet />
    </div>
  );
}

export default CheckoutPage;
