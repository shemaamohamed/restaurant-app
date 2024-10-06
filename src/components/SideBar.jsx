import React from 'react';
import SummaryCard from './SummaryCard';
import '../style/SideBar.css';
import { setCart } from "../features/CartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function SideBar() {
  const summaryItems = useSelector((state) => state.cart.cart);
  const dispatch =useDispatch();
  const navigate = useNavigate();
  // Calculate subtotal
  const subtotal = summaryItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0.1 * summaryItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = 5
  const total = subtotal + shipping - discount;
  return (
    <div className="sidebar">
      <h4>Order Summary</h4>
      <hr />
      {summaryItems.map((item, index) => (
        <SummaryCard
          key={index}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
        />
      ))}
      <hr />
      <div className="summary-item">
        <p>Subtotal: <span>{subtotal.toFixed(2)} EGP</span></p>
        <p>Shipping: <span>{shipping.toFixed(2)} EGP</span></p>
        <p>Discount: <span>-{discount.toFixed(2)} EGP</span></p>
        <hr />
        <p><strong>Total: <span>{total.toFixed(2)} EGP</span></strong></p>
        <button
  className="checkout-btn"
  onClick={() => {
    dispatch(setCart([]));
    navigate("/order-confirmed",{ relative: "path" });
  }}
>
  Place Order
</button>
      </div>
    </div>
  );
}

export default SideBar;
