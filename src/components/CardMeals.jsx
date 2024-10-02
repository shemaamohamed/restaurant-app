import { Card } from "react-bootstrap";
import LoveIcon from "./LoveIcon";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/CartSlice";
import toast from "react-hot-toast";
// const background_image1 = require("../assets/burger.jpeg");

function CardMelas({ product, name, description, price, photoName }) {
  const dipatch = useDispatch();

  return (
    <Card className="card-s">
      <Card.Img variant="top" src={photoName} style={{ maxHeight: "200px" }} />
      <Card.Body>
        <Card.Title className="card-t">
          {name} <LoveIcon />
        </Card.Title>
        <hr />
        <Card.Text>{description}</Card.Text>
        <Card.Text className="card-text">
          Price: {price} EGP
          <hr />
          <del>Price: 250.00 EGP</del>
        </Card.Text>

        <button onClick={() => dipatch(addToCart(product))} className="CartBtn">
          <span class="IconContainer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              stroke-linejoin="round"
              stroke-linecap="round"
              viewBox="0 0 24 24"
              stroke-width="2"
              fill="none"
              stroke="currentColor"
            >
              <circle r="1" cy="21" cx="9"></circle>
              <circle r="1" cy="21" cx="20"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </span>
          <p class="text">Add to Cart</p>
        </button>
      </Card.Body>
    </Card>
  );
}

export default CardMelas;
