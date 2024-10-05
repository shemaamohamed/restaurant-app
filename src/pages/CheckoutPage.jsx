import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import SideBar from '../components/SideBar';
import LoveIcon from '../components/LoveIcon';
import '../style/SideBar.css';

function CheckoutPage() {
  const [quantities, setQuantities] = useState(Array(4).fill(1)); // Quantity state for each card

  // Handlers for increment and decrement
  const incrementQuantity = (index) => {
    setQuantities(prevQuantities =>
      prevQuantities.map((q, i) => (i === index ? q + 1 : q))
    );
  };

  const decrementQuantity = (index) => {
    setQuantities(prevQuantities =>
      prevQuantities.map((q, i) => (i === index && q > 1 ? q - 1 : q))
    );
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-9">
            <div className="row">
              {Array.from({ length: 4 }).map((_, index) => (
                <div className="col-sm-4" key={index}>
                  <Card className="card-s">
                    <Card.Img
                      variant="top"
                      src="https://via.placeholder.com/200"
                      style={{ height: '200px' }}
                    />
                    <Card.Body>
                      <Card.Title className="card-t">
                        Static Meal {index + 1} <LoveIcon />
                      </Card.Title>
                      <hr />
                      <Card.Text style={{ height: '50px' }}>
                        This is a description of the static meal.
                      </Card.Text>
                      <Card.Text className="card-text">
                        Price: 150.00 EGP
                        <hr />
                        {/* Quantity controls */}
                        <div className="quantity-controls">
                          <button
                            onClick={() => decrementQuantity(index)}
                            className="quantity-btn"
                          >
                            -
                          </button>
                          <span>{quantities[index]}</span>
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
    </div>
  );
}

export default CheckoutPage;
