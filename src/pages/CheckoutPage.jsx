import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import SideBar from '../components/SideBar';
import LoveIcon from '../components/LoveIcon';
import '../style/SideBar.css';
import image1 from '../assets/B-meduim1.jpg';
import image2 from '../assets/B-meduim2.jpg';
import image3 from '../assets/B-meduim3.jpg';
import image4 from '../assets/B-meduim4.jpg';
function CheckoutPage() {
  const [quantities, setQuantities] = useState(Array(4).fill(1)); // Quantity state for each card

  // Array to store the imported images
  const images = [image1, image2, image3, image4];

  // Handlers for increment and decrement
  const incrementQuantity = (index) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((q, i) => (i === index ? q + 1 : q))
    );
  };

  const decrementQuantity = (index) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((q, i) => (i === index && q > 1 ? q - 1 : q))
    );
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-9">
            <div className="row">
              {images.map((img, index) => (
                <div className="col-sm-4" key={index}>
                  <Card className="card-s">
                    <Card.Img
                      variant="top"
                      src={img} // Use the imported images here
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
