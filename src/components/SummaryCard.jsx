import React, { useState } from 'react';
import '../style/SummaryCard.css';

function SummaryCard({ name, price, quantity }) {
  const [itemQuantity, setItemQuantity] = useState(quantity);

  // Handlers for increment and decrement
  const incrementQuantity = () => {
    setItemQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (itemQuantity > 1) {
      setItemQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <div className="summary-card">
      <p>{name}</p>
      <div className="quantity-controls">
        <button onClick={decrementQuantity} className="quantity-btn">-</button>
        <span>{itemQuantity}</span>
        <button onClick={incrementQuantity} className="quantity-btn">+</button>
      </div>
      <p>{itemQuantity} x {price} EGP</p>
    </div>
  );
}

export default SummaryCard;

