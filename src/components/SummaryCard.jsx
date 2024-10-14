import React, { useState } from 'react';
import '../style/SummaryCard.css';

function SummaryCard({ name, price, quantity }) {

  return (
    <div className="summary-card">
      <p>{name}</p>
      <div className="quantity-controls">
        <span>{quantity}</span>
      </div>
      <p>{quantity * price} EGP</p>
    </div>
  );
}

export default SummaryCard;

