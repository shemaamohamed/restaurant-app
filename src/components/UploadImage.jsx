import { Col, Container, Image, Row } from "react-bootstrap"
import Upload from "../assets/upload.svg";


function UploadImage() {
    const imgStyle = {
        width: "100%",
        height: "50%",
        margin: "auto",
        marginTop: "100px",
        
        
      };
  return (
    <Container style={{width:'100%'}}>
        <Row>
        <Col >
        <Image src={Upload}  style={imgStyle} rounded />
        <input id="picture" style={{width:'100%'}} type="file" class="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"/>
        </Col>
      </Row>
        
    </Container>
    
  )
}

export default UploadImage
