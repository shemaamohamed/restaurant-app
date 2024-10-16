import React from 'react';
import SummaryCard from './SummaryCard';
import '../style/SideBar.css';
import { setCart } from "../features/CartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToOrdered, logOrderedItems } from '../features/OrderSlice';
function SideBar({item ,quantity}) {
  const cart = useSelector((state) => state.cart.cart);
  const items = useSelector((state) => state.item.item);
  const dispatch =useDispatch();
  const navigate = useNavigate();
  
  // Calculate subtotal
   const subtotal = item.price*quantity
  // const shipping = 0.1 * summaryItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  // const discount = 5
  // const total = subtotal + shipping - discount;
  // const handlePlaceOrder = () => {
    
  //   summaryItems.forEach(item => {
  //     dispatch(addToOrdered(item));
  //   });
  //   dispatch(logOrderedItems());
  
  return (
    <div className="sidebar">
      <h4>Order Summary</h4>
      <hr />
    
        <SummaryCard
          name={item.name}
          price={item.price}
          quantity={quantity}
        />
      <hr />
      <div className="summary-item">
        <p>Subtotal: <span>{subtotal.toFixed(2)} EGP</span></p>
        {/* <p>Shipping: <span>{shipping.toFixed(2)} EGP</span></p>
        <p>Discount: <span>-{discount.toFixed(2)} EGP</span></p> */}
        <hr /> 
        {/* <p><strong>Total: <span>{total.toFixed(2)} EGP</span></strong></p> */}
        <button
  className="checkout-btn"
  onClick={() => {
    // dispatch(setCart([]));
    // handlePlaceOrder()
    // navigate("/order-confirmed",{ relative: "path" })
  }}
>
  Place Order
</button>
      </div>
    </div>
  );
}


export default SideBar;
