import { Dialog, DialogActions,DialogTitle } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { Form } from "react-bootstrap"

import axios from "axios"
import toast from "react-hot-toast"
import UploadImage from "../components/UploadImage"


function UpdateitemPage({show,onHide,onConfirm,category,description,price,itemName,id}) {
  const [item,setItem]=useState({
    name: itemName,
    description: description,
    price:price,
    category:category,
  })
  const [errors, setErrors] = useState({}); 

  const handleImageUpload = (file) => {
    setItem({ ...item, photoName: file });
    console.log("Uploaded file:", file);
  };
  const handleChange=(e)=>{
    setItem({...item,[e.target.name]:e.target.value})
    setErrors({ ...errors, [e.target.name]: "" }); 

    console.log(item)
  }
  const validate = () => {
    const newErrors = {};
    if (!item.name) newErrors.name = "Item name is required";
    if (!item.description)
      newErrors.description = "Item description is required";
    if (!item.price || isNaN(item.price) || item.price <= 0)
      newErrors.price = "Valid price is required";
    if (item.discount && (isNaN(item.discount) || item.discount < 0))
      newErrors.discount = "Discount should be a positive number";
    if (!item.category) newErrors.category = "Category is required";
    return newErrors;
  };
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const formErrors = validate();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); 
      return;
    }
    
    const formData = new FormData();
      formData.append("id",id)
      formData.append("name", item.name);
      formData.append("description", item.description);
      formData.append("price", item.price);
      formData.append("category", item.category);
      if(item.photoName){
        console.log(item.photoName)
        formData.append("image", item.photoName);
      }
    
    try{
      await axios.put(`http://localhost:4000/api/food/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ).then((res)=>{
        onHide();
        toast.success("Item updated successfully");
      }).catch((err) => {
        console.log(err); 
     
      });
      

    }
    catch(error){
      toast.error("Error updating item");
      console.log(error)
    } 
  }
  return (
    <Dialog
    open={show}
    onClose={onHide}
    fullWidth
    maxWidth="sm"
  >
    <DialogTitle style={{textAlign:'center',marginTop:'20px',fontWeight:'600'}}>
      Update Item
    </DialogTitle>
    <Form className="item-form" onSubmit={handleSubmit} style={{width:'100%',paddingTop:'0px'}}>
      <Form.Group style={{width:'100%' ,color:'gray'}}>
        <Form.Label >Name Item</Form.Label>
        <Form.Control
        type="text"
        placeholder="Enter Name of item"
        value={item.name}
        onChange={handleChange}
        name="name"
        isInvalid={!!errors.name} 
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
        <Form.Label>Description Item</Form.Label>
        <Form.Control
        as="textarea"
        type="text" 
        placeholder="Enter Description of item"
        value={item.description}
        onChange={handleChange}
        name="description"
        className="description"
        isInvalid={!!errors.description}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors.description}
        </Form.Control.Feedback>
        <Form.Label>Price Item</Form.Label>
        <Form.Control
        type="number"
        placeholder="Enter Price of item"
        value={item.price}
        onChange={handleChange}
        name="price"
        isInvalid={!!errors.price}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors.price}
        </Form.Control.Feedback>
        <Form.Label>Category Item</Form.Label>
        <Form.Control
        type="text"
        placeholder="Enter Category  of item"
        value={item.category}
        onChange={handleChange}
        name="category"
        isInvalid={!!errors.category}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors.category}
        </Form.Control.Feedback>
        
        <Form.Group controlId="formItemImage">
                <Form.Label>Upload Image</Form.Label>
                <UploadImage onUpload={handleImageUpload} />
               
          </Form.Group>
        <DialogActions>
        <Button variant="warning" style={{color:'white'}} type="submit"  autoFocus>
        Update</Button>
        <Button variant="secondary" onClick={onHide} autoFocus>
        Cancel
      </Button>
      
          
        </DialogActions>
       
      
        </Form.Group>
        

     

    </Form>
    
  </Dialog>
  )
}

export default UpdateitemPage