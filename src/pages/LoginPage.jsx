import '../style/Login.css';
import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';
import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
function Loginpage(){

    const[action,setAction]=useState("Login");
    return(
       <Container>
        <Row sm={1} md={2} xl={3}>
            <Col style={{margin:'auto'}}>
            <Form   style={{paddingTop:'0px',margin:'auto',backgroundColor:"#fff",padding:'30px',marginTop:'50px'}}>
            <div className="header-l">
                <div className="text-l">{action}</div>
                <div className="underline"></div>
            </div>
            <Form.Group>
            <div className="inputs-l">
                {action==="Login"?<div></div>:
                <InputGroup className="mb-3">
                <InputGroup.Text id="name-addon">
                    <img src={email_icon} alt="Name Icon" style={{ width: '20px' }} />
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Enter your Name"
                    aria-label="Name"
                    aria-describedby="name-addon"
                />
                </InputGroup>
                }
               
              
               <InputGroup className="mb-3">
                    <InputGroup.Text id="email-addon">
                        <img src={email_icon} alt="Email Icon" style={{ width: '20px' }} />
                    </InputGroup.Text>
                    <Form.Control
                        type="email"
                        placeholder="Enter your E-mail "
                        aria-label="Email"
                        aria-describedby="email-addon"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                        <InputGroup.Text id="password-addon">
                            <img src={password_icon} alt="Password Icon" style={{ width: '20px' }} />
                        </InputGroup.Text>
                        <Form.Control
                            type="password"
                            placeholder="Enter your Password"
                            aria-label="Password"
                            aria-describedby="password-addon"
                        />
                    </InputGroup>

                {action==="Sign Up"?<div></div>:<div className="forgot-password">Forgot Password?<span>Click Here</span></div>}

                <div className="submit-container">
                <Button className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</Button>
                <Button className={action==="Sign Up"?"submit gray":"submit"}onClick={()=>{setAction("Sign Up")}}>Sign up</Button>

                </div>

            </div>
            
            </Form.Group>
           
        </Form>

            </Col>
        </Row>
        

       </Container>
        
    );
};
export default Loginpage;