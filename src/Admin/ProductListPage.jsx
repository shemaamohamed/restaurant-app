import { useState, useEffect } from "react";
import { Container, Stack, Table, Spinner, Alert } from "react-bootstrap";
import EditButton from "../components/Buttons/EditButton";
import DeleteButton from "../components/Buttons/DeleteButton";
import AddButton from "../components/Buttons/AddButton";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setItem } from "../features/ItemSlice";
import { Link } from 'react-router-dom';
{/* <img 
src={item.photoName 
  ? (item.photoName.startsWith('http') 
    ? item.photoName 
    : require(`../assets/${item.photoName}`)) 
  : require('../assets/B-meduim1.jpg')} 
alt={item.name} 
width="50" 
// onError={(e) => { e.target.src = require('../../assets/B-meduim1.jpg'); }} 
/> */}

function ProductListPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const item = useSelector((state) => state.item.item);
  console.log(item);
  useEffect(()=>{
    const fetchItems= async()=>{
     await axios.get('http://localhost:8000/product')
      .then(response => {
        dispatch(setItem(response.data));
        console.log(response.data);
        setLoading(false);

      }).catch(error=>{
        setError(error.message);
       console.error('Error fetching data:', error);
       setLoading(false);

      }) 

    }
      
    fetchItems();
    const intervalId = setInterval(() => {
      fetchItems();
    }, 1000); 

    return () => clearInterval(intervalId);
  },[dispatch])
  if (loading) {
    return (
      <Container className="text-center" style={{ marginTop: "20px" }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center" style={{ marginTop: "20px" }}>
        <Alert variant="danger">Error fetching products: {error}</Alert>
      </Container>
    );
  }
  return (
    <Container style={{ marginTop: "20px" }}>
      <Stack
        direction="horizontal"
        className="mb-6"
        style={{ justifyContent: "space-between" }}
      >
        <h1>Products</h1>
        <AddButton  />
      </Stack>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {item.map((item,index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>
              <img 
                  src={item.photoName }
                  alt={item.name} 
                  width="50" 
                  // onError={(e) => { e.target.src = require('../../assets/B-meduim1.jpg'); }} 
                />
              </td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.price} EGP</td>
              <td>
                <Stack direction="horizontal" gap={3}>
                  <EditButton />
                  <DeleteButton name={item.name} />
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ProductListPage;
