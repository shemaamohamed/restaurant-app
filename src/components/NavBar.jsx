import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Badge, Navbar } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import "../style/NavBar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function NavBar() {
  const cart = useSelector((state) => state.cart.cart);

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
            <Nav.Link as={Link} to="/cart">
              Cart
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                stroke-linejoin="round"
                stroke-linecap="round"
                viewBox="0 0 24 24"
                stroke-width="2"
                fill="none"
                stroke="currentColor"
              >
                <circle r="1" cy="21" cx="9"></circle>
                <circle r="1" cy="21" cx="20"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <Badge
                style={{ position: "relative", bottom: "15px", left: "7px" }}
                pill
                bg="danger"
              >
                {cart.length}
              </Badge>
            </Nav.Link>
            <Nav.Link as={Link} to="/connect">
              Contact
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              style={{ marginLeft: "70px" }}
              title="Profile"
              id="basic-nav-dropdown"
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
