import { useState, useEffect } from "react";
import { Container, Stack, Table, Spinner, Alert } from "react-bootstrap";
import EditButton from "../components/Buttons/EditButton";
import DeleteButton from "../components/Buttons/DeleteButton";
import AddButton from "../components/Buttons/AddButton";
import axios from "axios";

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/product");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        <AddButton />
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
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <img src={product.photoName} alt={product.name} width="50" />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price} EGP</td>
              <td>
                <Stack direction="horizontal" gap={3}>
                  <EditButton />
                  <DeleteButton />
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
