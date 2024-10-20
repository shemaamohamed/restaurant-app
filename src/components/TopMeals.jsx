import {  Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../style/TopMeals.css";
import CardMelas from "./CardMeals";
import axios from "axios";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItem } from "../features/ItemSlice";
import { useState } from 'react';
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import ShowButton from "./Buttons/ShowButton";
import toast from "react-hot-toast";
import backendBaseUrl from "../utils/utils";

function TopMeals() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const menuItems = useSelector((state) => state.item.item || []);
  const [loading,setloading]=useState(true)

  useEffect(() => {
    axios.get(`${backendBaseUrl}/api/food/list`) 
      .then(response =>{
        dispatch(setItem(response.data.data))
        setloading(false)
      })
        
      .catch(error =>{
         setloading(true)
         toast.error('Error fetching menu items')
      });
  }, [dispatch]);
  
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
  };

  const getRandomItems = (items) => {
    const shuffledItems = shuffleArray([...items]); 
    return shuffledItems.slice(0, 4); 
  };

  const randomItems = menuItems.length > 0 ? getRandomItems(menuItems) : [];
  const ShowFullMenu=()=>(
    navigate('/menu')
  )

  return (
    <Container className="p-3 mt-3">
        
              
              
      <Row className="p-3" >
      
         
             { randomItems.length > 0 ?(randomItems.map((product) => (
                <Col key={product.id}>
                  <CardMelas
                    product={product}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    photoName={product.image}
                  />
                </Col>
              ))):(loading && (
                <Loader></Loader>
              )

                  
              )
              }
                  
           
   
          
      
      </Row>
      {!loading && (
        <Col className="d-flex justify-content-end mt-3">
          <ShowButton ShowFullMenu={ShowFullMenu}></ShowButton>
        </Col>)}
     
    </Container>
  );
}


export default TopMeals;
