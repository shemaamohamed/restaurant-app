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
import toast from "react-hot-toast";
import backendBaseUrl from "../utils/utils";


function CartPage() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart ); // Cart holds item IDs and quantities
  const items = useSelector((state) => state.item.item); // Item slice for item details
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if(token){
      const intervalId = setInterval(()=>{
        axios.get(`${backendBaseUrl}/api/cart/get`, {
          headers: {
            'token': token,
          },
        }).then(response => {
          dispatch(setCart(response.data.cartData)); 
    
        }).catch(error => toast.error(
          "Error fetching cart data"
        ));
  
      },1000)
      return () => {
        clearInterval(intervalId);
      };
      

    }else{
      dispatch(setCart([]))
    }
   
  }, [dispatch ,token]);

  const totalPrice = Object.entries(cart).reduce((acc, [itemId, quantity]) => {
    const product = items.find(item => item._id === itemId);
    return acc + (product ? product.price * quantity : 0);
  }, 0);
  const user_login =localStorage.getItem('token')
  
  const incrementQuantity = async (itemId) => {
    const item = { "itemId": itemId };
    await axios.post(`${backendBaseUrl}/api/cart/add`, item, {
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      },
    }).then(() => {
      dispatch(updateCartQuantity({ itemId, quantity: cart[itemId] + 1 }));
      toast.success("Item added to cart successfully");
    }).catch((err) => {
      toast.error("Error adding item to cart");
    });
  };

  const decrementQuantity = async (itemId) => {
    const item = { "itemId": itemId };
    if (cart[itemId] >= 1) {
      await axios.delete(`${backendBaseUrl}/api/cart/remove`, 
        {
          data: item, // Pass item as data
          headers: {
            'Content-Type': 'application/json',
            'token': token,
          },
        }
        
      ).then(() => {
        if(cart[itemId] === 1){
          toast.success("Item removed from cart successfully");
          dispatch(removeFromCart(itemId));
        }
        else{
          dispatch(updateCartQuantity({ itemId, quantity: cart[itemId] - 1 }));
        }
      }).catch((err) => {
        toast.error("Error removing item from cart");
      });
    } 
  };


  return (
    <Container style={{marginTop:'50px'}}>
          {Object.keys(cart).length > 0 ? (
            <Table style={{ textAlign: "center" ,margin:"auto" ,width:'70%'  }}  responsive  bordered>
              <thead>
                <tr>
                <th style={{ width: '15%' }}>Product</th>
                <th style={{ width: '20%' }}>Description</th> 
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
                          src={`${backendBaseUrl}/images/${product.image}`}
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
