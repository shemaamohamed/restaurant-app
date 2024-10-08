import { useState } from "react";
import { Col, Container,  Row } from "react-bootstrap"
import { Form } from 'react-bootstrap';
import uploadImage  from "../assets/upload.svg";



function UploadImage({onUpload}) {
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          console.log("Uploaded image:", file); // Log the uploaded image file
          setImage(URL.createObjectURL(file)); // Preview the image
          onUpload(file); // Pass the file to the parent component
        }
      }
  return (
    
        <Row>
        <Col >
        <Form.Group controlId="formFile" className="mb-3">
          {!image && <img src={uploadImage} alt="Preview" style={{ width: '70%', marginTop: '10 px' }}/>}
          {image && <img src={image} alt="Preview" style={{ width: '70%', marginTop: '10 px' }} />}
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Group>
        </Col>
      </Row>
    
  );
}

export default UploadImage;
