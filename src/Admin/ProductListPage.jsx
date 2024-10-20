import { useState, useEffect } from "react";
import { Container, Stack, Table, Spinner, Alert } from "react-bootstrap";
import EditButton from "../components/Buttons/EditButton";
import DeleteButton from "../components/Buttons/DeleteButton";
import AddButton from "../components/Buttons/AddButton";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setItem } from "../features/ItemSlice";
import backendBaseUrl from "../utils/utils";



function ProductListPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const item = useSelector((state) => state.item.item);
  useEffect(()=>{
    const fetchItems= async()=>{
     await axios.get(`${backendBaseUrl}/api/food/list`)
      .then(response => {
        dispatch(setItem(response.data.data));
        setLoading(false);

      }).catch(error=>{
        setError(error.message);
       setLoading(false);

      }) 

    }
      
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
            <th>Category</th>
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
                  src={`${backendBaseUrl}/images/${item.image}`}
                  alt={item.name} 
                  width="80" 
                />
              </td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.description}</td>
              <td>{item.price} EGP</td>
              <td>
                <Stack direction="horizontal" gap={3}>
                  <EditButton name={item.name} category={item.category} description={item.description} image={item.image} price={item.price} id={item._id}/>
                  <DeleteButton name={item.name} id={item._id}/>
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
