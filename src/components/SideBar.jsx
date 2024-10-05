import React from 'react';
import SummaryCard from './SummaryCard';
import '../style/SideBar.css';

function SideBar() {
  const summaryItems = [
    { name: "Meal 1", price: 150, quantity: 1 },
    { name: "Meal 2", price: 200, quantity: 2 },
    { name: "Meal 3", price: 180, quantity: 1 },
    // Add more items as needed
  ];

  // Calculate subtotal
  const subtotal = summaryItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 50; // Static shipping fee
  const discount = 25; // Static discount
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
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default SideBar;
