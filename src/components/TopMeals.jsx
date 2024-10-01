import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "../style/TopMeals.css"
import CardMelas from './CardMeals';


function TopMeals() {

  return (
    <Container className='p-3 mt-3'>
        <h1>Top Meals</h1>
            <Row xs={1} md={2} lg={3} xl={4} >
                {Array.from({ length: 4 }).map((_, idx) => (
                    <Col>
                       <CardMelas/>  
                    </Col>
                ))}
                     
            </Row>
  </Container>
   
   
  );
}

export default TopMeals;