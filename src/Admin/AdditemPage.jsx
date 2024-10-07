import { useState } from "react";
import { Col, Container, Form, Row, Stack } from "react-bootstrap";
import SaveButton from "../components/Buttons/SaveButton";
import "../style/ItemForm.css";
import UploadImage from "../components/UploadImage";
import axios from "axios";

function AdditemPage() {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDiscount, setitemDiscount] = useState("");
  const [itemImage, setItemImage] = useState(null);

  // Handle file upload
  const handleImageUpload = (file) => {
    setItemImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle the data, including the image
    const formData = new FormData();
    formData.append("name", itemName);
    formData.append("description", itemDescription);
    formData.append("price", itemPrice);
    formData.append("image", itemImage);

    try {
      const response = await axios.post(
        // "API url",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Product added successfully:", response.data);
      alert("done ");
      setItemName("");
      setItemDescription("");
      setItemPrice("");
      setItemImage(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error ");
    }
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Stack
        direction="horizontal"
        className="mb-6"
        style={{ justifyContent: "space-between", flexWrap: "wrap" }}
      >
        <h4>Add New Item</h4>
        <SaveButton onClick={handleSubmit} style={{ marginTop: "10px" }} />
      </Stack>

      <Container className="item-form-container">
        <Form className="item-form" onSubmit={handleSubmit}>
          <Row>
            <Col md={6} xs={12} className="mb-3">
              <Form.Group controlId="formItemName">
                <Form.Label>Name Item</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name of item"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formItemDescription" className="mb-3">
                <Form.Label>Description Item</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Description of item"
                  className="description"
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formItemPrice" className="mb-3">
                <Form.Label>Price Item</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Price of item"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formItemDiscount" className="mb-3">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Price of item"
                  value={itemDiscount}
                  onChange={(e) => setitemDiscount(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={4} xs={12} className="mb-3">
              <Form.Group controlId="formItemImage">
                <Form.Label>Upload Image</Form.Label>
                <UploadImage onUpload={handleImageUpload} />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </Container>
  );
}

export default AdditemPage;
