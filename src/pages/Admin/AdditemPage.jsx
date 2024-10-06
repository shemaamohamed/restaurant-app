import { Container, Form, Stack } from "react-bootstrap"
import SaveButton from './../../components/Buttons/SaveButton';
import'./../../style/ItemForm.css'
import UploadImage from "../../components/UploadImage";


function AdditemPage() {
    
  return (
    <Container style={{marginTop:'20px'}}>
        <Stack direction="horizontal"  className="mb-6" style={{ justifyContent: "space-between" }} >
                    <h4>Add New Item</h4>
                    <SaveButton/>  
        </Stack>
        <Container className="item-form-container" >
        <Form className="item-form">
            <Form.Group className="mb-3 item-form-1"  >
                <Form.Label>Name Item </Form.Label>
                <Form.Control type="text" placeholder="Enter Name of item" />
                <Form.Label>Description Item</Form.Label>
                <Form.Control type="text" placeholder="Enter Description of item"  className="description"/>
                <Form.Label>Price Item</Form.Label>
                <Form.Control type="text" placeholder="Enter Price of item" />
                <Form.Label>Discount Item </Form.Label>
                <Form.Control type="text" placeholder="Enter Discount of item" />
            </Form.Group>
            <Form.Group className="mb-3 item-form-2"  >
                <Form.Label>Upload Image </Form.Label>
                <UploadImage/>  
            </Form.Group>
        </Form>
        </Container>
    </Container>
  )
}

export default AdditemPage
