import { useState } from "react";
import { Col, Container, Form, Row, Stack } from "react-bootstrap";
import SaveButton from "../components/Buttons/SaveButton";
import "../style/ItemForm.css";
import UploadImage from "../components/UploadImage";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AdditemPage() {
  const navigate = useNavigate();
  const [item, setItem] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    photoName: "",
  });

  const [errors, setErrors] = useState({}); // State for error messages

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
  };

  const handleImageUpload = (file) => {
    setItem({ ...item, photoName: file });
    setErrors({ ...errors, photoName: "" }); // Clear error when image is uploaded
  };

  const validate = () => {
    const newErrors = {};
    if (!item.name) newErrors.name = "Item name is required";
    if (!item.description)
      newErrors.description = "Item description is required";
    if (!item.price || isNaN(item.price) || item.price <= 0)
      newErrors.price = "Valid price is required";
    if (item.discount && (isNaN(item.discount) || item.discount < 0))
      newErrors.discount = "Discount should be a positive number";
    if (!item.photoName) newErrors.photoName = "Image is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Set error messages if validation fails
      return;
    }

    try {
      await axios.post("http://localhost:8000/product", item, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Product added successfully");
      navigate("/productlist");
    } catch (error) {
      toast.error("Error adding product");
    }
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Container className="item-form-container">
        <Form className="item-form" onSubmit={handleSubmit}>
          <Row>
            <Col md={6} xs={12} className="mb-3">
              <Stack
                direction="horizontal"
                className="mb-6"
                style={{ justifyContent: "space-between", flexWrap: "wrap" }}
              >
                <h4>Add New Item</h4>
                <SaveButton type="submit" style={{ marginTop: "10px" }} />
              </Stack>
              <Form.Group controlId="formItemName">
                <Form.Label>Name Item</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name of item"
                  value={item.name}
                  onChange={handleChange}
                  name="name"
                  isInvalid={!!errors.name} // Display error if any
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formItemDescription" className="mb-3">
                <Form.Label>Description Item</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Description of item"
                  value={item.description}
                  onChange={handleChange}
                  name="description"
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formItemPrice" className="mb-3">
                <Form.Label>Price Item</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Price of item"
                  value={item.price}
                  onChange={handleChange}
                  name="price"
                  isInvalid={!!errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formItemDiscount" className="mb-3">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Discount of item"
                  value={item.discount}
                  onChange={handleChange}
                  name="discount"
                  isInvalid={!!errors.discount}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.discount}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6} xs={12} className="mb-3">
              <Form.Group controlId="formItemImage">
                <Form.Label>Upload Image</Form.Label>
                <UploadImage onUpload={handleImageUpload} />
                {errors.photoName && (
                  <div className="invalid-feedback d-block">
                    {errors.photoName}
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </Container>
  );
}

export default AdditemPage;