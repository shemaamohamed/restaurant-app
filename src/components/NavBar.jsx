import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Badge, Navbar } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import "../style/NavBar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function NavBar() {
  const cart = useSelector((state) => state.cart.cart);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: "white" }}
      variant="light"
      sticky="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          YummY 😋
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          style={{ justifyContent: "space-around" }}
          id="basic-navbar-nav"
        >
          <Nav className="navdisplay">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/menu">
              Menu
            </Nav.Link>
            
            <Nav.Link as={Link} to="/connect">
              Contact
            </Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link as={Link} to="/cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="1.5em"
                stroke-linejoin="round"
                stroke-linecap="round"
                viewBox="0 0 24 24"
                stroke-width="2"
                fill="none"
                stroke="currentColor"
                color="black"
              >
                <circle r="1" cy="21" cx="9"></circle>
                <circle r="1" cy="21" cx="20"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <Badge
                style={{ position: "relative", bottom: "5px", left: "3px" }}
                pill
                bg="danger"
              >
                {totalQuantity}
              </Badge>
            </Nav.Link>
            <Nav.Link as={Link} to="/">
            <svg
                class="icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20.503"
                height="20.625"
                viewBox="0 0 17.503 15.625"
                color="black"
              >
                <path
                  id="Fill"
                  d="M8.752,15.625h0L1.383,8.162a4.824,4.824,0,0,1,0-6.762,4.679,4.679,0,0,1,6.674,0l.694.7.694-.7a4.678,4.678,0,0,1,6.675,0,4.825,4.825,0,0,1,0,6.762L8.752,15.624ZM4.72,1.25A3.442,3.442,0,0,0,2.277,2.275a3.562,3.562,0,0,0,0,5l6.475,6.556,6.475-6.556a3.563,3.563,0,0,0,0-5A3.443,3.443,0,0,0,12.786,1.25h-.01a3.415,3.415,0,0,0-2.443,1.038L8.752,3.9,7.164,2.275A3.442,3.442,0,0,0,4.72,1.25Z"
                  transform="translate(0 0)"
                ></path>
              </svg>
              <Badge
                style={{ position: "relative", bottom: "5px", left: "5px" }}
                pill
                bg="danger"
              >
                {0}
              </Badge>
            </Nav.Link>
          </Nav>
          
          <Nav>
            <NavDropdown
              style={{ marginLeft: "70px" }}
              id="basic-nav-dropdown"
              title="Account"
            >
              
              <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Register</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
