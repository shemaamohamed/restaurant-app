import { Dialog, DialogActions,DialogTitle } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { Form } from "react-bootstrap"

import axios from "axios"
import toast from "react-hot-toast"


function UpdateitemPage({show,onHide,onConfirm,itemName,id}) {
  const [item,setItem]=useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    photoName:''
  })
  const handleChange=(e)=>{
    setItem({...item,[e.target.name]:e.target.value})
    console.log(item)
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      await axios.put(`http://localhost:8000/product/${id}`,item)
      onHide();
      toast.success("Item updated successfully");

    }
    catch(error){
      console.log(error)
    }
    
    
  }
  const fetchItem = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8000/product/${id}`);
      const data = response.data;
      console.log(data)
      setItem(data);
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  }, [id]);
 
    useEffect(() => {
      if (show && id) {
        fetchItem(); 
      }
    }, [show, id ,fetchItem]);

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
        ></Form.Control>
        <Form.Label>Description Item</Form.Label>
        <Form.Control
        as="textarea"
        type="text" 
        placeholder="Enter Description of item"
        value={item.description}
        onChange={handleChange}
        name="description"
        className="description"
        ></Form.Control>
        <Form.Label>Price Item</Form.Label>
        <Form.Control
        type="number"
        placeholder="Enter Price of item"
        value={item.price}
        onChange={handleChange}
        name="price"
        ></Form.Control>
        <Form.Label>Discount Item</Form.Label>
        <Form.Control
        type="number"
        placeholder="Enter Price of item"
        value={item.discount}
        onChange={handleChange}
        name="discount"
        ></Form.Control>
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