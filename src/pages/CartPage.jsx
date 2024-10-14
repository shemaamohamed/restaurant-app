import React, { useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  setCart,
  updateCartQuantity,
} from "../features/CartSlice";
import { useNavigate } from "react-router-dom";
import CartEmpty from "../components/CartEmpty";
import axios from "axios";

function CartPage() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart ); // Cart holds item IDs and quantities
  const items = useSelector((state) => state.item.item); // Item slice for item details
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
   const intervalId = setInterval(()=>{
      axios.get('http://localhost:4000/api/cart/get', {
        headers: {
          'token': token,
        },
      }).then(response => {
        dispatch(setCart(response.data.cartData)); // Set the cart data in Redux
  
      }).catch(error => console.error('Error fetching cart data:', error));

    },1000)
    return () => {
      clearInterval(intervalId);
    };
    
  }, [dispatch]);

  const totalPrice = Object.entries(cart).reduce((acc, [itemId, quantity]) => {
    const product = items.find(item => item._id === itemId);
    return acc + (product ? product.price * quantity : 0);
  }, 0);
  const user_login =localStorage.getItem('token')
  
  const incrementQuantity = async (itemId) => {
    const item = { "itemId": itemId };
    await axios.post('http://localhost:4000/api/cart/add', item, {
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      },
    }).then(() => {
      dispatch(updateCartQuantity({ itemId, quantity: cart[itemId] + 1 }));
    }).catch((err) => {
      console.log(err);
    });
  };

  const decrementQuantity = async (itemId) => {
    const item = { "itemId": itemId };
    if (cart[itemId] >= 1) {
      await axios.delete('http://localhost:4000/api/cart/remove', 
        {
          data: item, // Pass item as data
          headers: {
            'Content-Type': 'application/json',
            'token': token,
          },
        }
        
      ).then(() => {
        if(cart[itemId] === 1){
          console.log("Item removed from cart successfully");
          dispatch(removeFromCart(itemId));
        }
        else{
          dispatch(updateCartQuantity({ itemId, quantity: cart[itemId] - 1 }));
        }
      }).catch((err) => {
        console.log(err);
      });
    } 
  };


  return (
    <Container>
     
          <div >
            <h3 className=" text-center" style={{margin:'auto' ,padding:'10px'}}>Shopping Cart</h3>
            {/* {Object.keys(cart).length > 0 && (
              <Button variant="danger" onClick={handleDeleteAll}>
                Delete All
              </Button>
            )} */}
          </div>

          {Object.keys(cart).length > 0 ? (
            <Table style={{ textAlign: "center" ,margin:"auto" ,width:'70%'  }}  responsive  bordered>
              <thead>
                <tr>
                <th style={{ width: '15%' }}>Product</th>
                <th style={{ width: '20%' }}>Description</th> {/* Wider column for description */}
                <th style={{ width: '10%' }}>Price</th>
                <th style={{ width: '10%' }}>Quantity</th>
                <th style={{ width: '10%' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(cart).map(([itemId, quantity]) => {
                  const product = items.find(item => item._id === itemId);
                  return product ? (
                    <tr  className="text-center align-middle" key={itemId}>
                      <td>
                        <Row >
                          < Col>
                          <img
                          src={`http://localhost:4000/images/${product.image}`}
                          alt={product.name}
                          style={{ width: "100%"}}
                        />
                          </Col>
                        
                        <strong  >{product.name}</strong><br />

                        </Row>
                        
                      </td>
                      <td>{product.description}</td>
                      <td>{product.price} EGP</td>
                      <td>
                        <Button onClick={() => decrementQuantity(itemId)} variant="light" size="sm">-</Button>
                        <span className="mx-2">{quantity}</span>
                        <Button onClick={() => incrementQuantity(itemId)} variant="light" size="sm">+</Button>
                        {' '}
                        {/* <Button variant="outline-danger" className="ml-3" onClick={() => dispatch(removeFromCart(itemId))}>X</Button> */}
                      </td>
                      <td>{product.price * quantity} EGP</td>
                    </tr>
                  ) : null; // Handle case if product not found
                })}
              </tbody>
            </Table>
          ) : (
            <CartEmpty />
          )}
        {Object.keys(cart).length > 0 && (
        <Row className="justify-content-end" style={{marginBottom:'60px'}}>
          <Col md={3}>
            <h4 className="text-end">Total price: {totalPrice} EGP</h4>
            {!user_login ? (
              <>
                <Button variant="primary" className="w-20" disabled>Check Out</Button>
                <p style={{ textAlign: "center", color: "red" }}>You need to log in first in order to checkout</p>
              </>
            ) : (
              <Button onClick={() => navigate("/checkout")} variant="primary" className="w-100 ">Check Out</Button>
            )}
          </Col>
        </Row>
      )}
      
    </Container>
  );
}

export default CartPage;
