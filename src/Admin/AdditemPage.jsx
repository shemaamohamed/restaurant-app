import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Stack } from "react-bootstrap";
import SaveButton from "../components/Buttons/SaveButton";
import "../style/ItemForm.css";
import UploadImage from "../components/UploadImage";
import axios from "axios";
import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { addToItem } from "../features/ItemSlice";

function AdditemPage() {
  // const dispatch=useDispatch()
  const navigate=useNavigate()
  const [item,setItem]=useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    photoName:''
  })
  // const items = useSelector((state) => state.item.item);
  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
    console.log(item);
  };

  // Handle file upload
  const handleImageUpload = (file) => {
    setItem({ ...item, photoName: file }); // Store the file in state

  };
  useEffect(()=>{

  },[item])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Item before form submission:", item); // Debugging log

    // const formData = new FormData();
    // formData.append('name', item.name);
    // formData.append('description', item.description);
    // formData.append('price', item.price);
    // formData.append('discount', item.discount);
    // if (item.photoName instanceof File) {
    //   formData.append('photoName', item.photoName);
    // } 
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`); // Debugging log
    // }
    try {
      const response = await axios.post(
        "http://localhost:8000/product",
        JSON.stringify(item), 
        {
          headers: {
            "Content-Type": "application/json", 
          },
        }
        // formData,
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );

      console.log("Product added successfully:", response.data);
      // console.log(formData)
      // console.log('after dispatch' ,items);
      // dispatch(addToItem(item));
      toast.success("Product added successfully");
      navigate("/productlist");
      
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error ");
    }
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Container className="item-form-container">
        <Form className="item-form" onSubmit={handleSubmit}>
          <Row>
            <Col md={6} xs={12} className="mb-3">
              <Form.Group controlId="formItemName">
                    <Stack
                      direction="horizontal"
                      className="mb-6"
                      style={{ justifyContent: "space-between", flexWrap: "wrap" }}
                    >
                        <h4>Add New Item</h4>
                        <SaveButton type="submit"  style={{ marginTop: "10px" }} />
                    </Stack>
                <Form.Label>Name Item</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name of item"
                  value={item.name}
                  onChange={handleChange}
                  name="name"
                />
              </Form.Group>

              <Form.Group controlId="formItemDescription" className="mb-3">
                <Form.Label>Description Item</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Description of item"
                  className="description"
                  value={item.description}
                  onChange={handleChange}
                  name="description"

                />
              </Form.Group>

              <Form.Group controlId="formItemPrice" className="mb-3">
                <Form.Label>Price Item</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Price of item"
                  value={item.price}
                  onChange={handleChange}
                  name="price"
                />
              </Form.Group>
              <Form.Group controlId="formItemDiscount" className="mb-3">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Price of item"
                  value={item.discount}
                  onChange={handleChange}
                  name="discount"
                />
              </Form.Group>
            </Col>

            <Col md={6} xs={12} className="mb-3">
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
