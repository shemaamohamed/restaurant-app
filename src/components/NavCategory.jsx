import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../style/NavCategory.css"
function NavCategory({displayAll,displayDeserts, displayPasta, displaySalad, displaySandwich,handleSearch ,searchValue}) {
   
 
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className='navcategory' fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className=" me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           <Nav.Link  href="#Menu" onClick={()=>{ displayAll()}} active>Menu</Nav.Link>

            <Nav.Link  href="#Pasta"    onClick={()=>{ displayPasta()}} >Pasta</Nav.Link>
            <Nav.Link href="#Sandwich" onClick={()=>{displaySandwich()}}>Sandwich</Nav.Link>
            <Nav.Link href="#Deserts" onClick={()=>{displayDeserts()}}>Deserts</Nav.Link>
            <Nav.Link href="#Salad"   onClick={()=>{displaySalad()}}>Salad</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Name"
              className="me-2"
              aria-label="Search"
              onChange={handleSearch}
              value={searchValue}

            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>  
  )
}

export default NavCategory
