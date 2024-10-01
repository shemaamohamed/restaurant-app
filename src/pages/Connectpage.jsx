import React from 'react'
import { Container } from 'react-bootstrap'
import { Card } from 'react-bootstrap';
import background_image1 from '../assets/contactus.svg';

function Connectpage() {
    // const background_image1=require('../assets/contactUs-e1e3c885.svg');
  return (
    <Container style={{height:'70vh',alignItems:'center',display:'flex',justifyContent:'center',flexDirection:'column'}}>
    <Card style={{width:'70%' ,margin:'auto'}}>
      <Card.Title style={{textAlign:'center',color:'red',padding:'10px'}}>Let's Connect</Card.Title>
      <Card.Img variant="top" src={background_image1} style={{width:'50%',margin:'auto'}}/>
      <Card.Body>
        <Card.Title style={{textAlign:'center'}}>Sometimes you just need to speak to a real person. Give us a call.</Card.Title>
        <Card.Title style={{textAlign:'center'}}>
        <a style={{textDecoration:'none'}} href="mailto:YummY@food.com">YummY@food.com</a>
        </Card.Title>
        <Card.Title style={{textAlign:'center'}}>📞190914
        </Card.Title>
      </Card.Body>
    </Card>
    
        
    </Container>
  )
}

export default Connectpage;
