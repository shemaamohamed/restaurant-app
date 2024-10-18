import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Badge, Navbar } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import "../style/NavBar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/AuthSlice";
import Logo from "../assets/icon-food.svg"
import Cart from "../assets/cart.svg"
import Heart from "../assets/heart (2).svg"
import Profile from "../assets/userprofile.svg"
import { setCart } from "../features/CartSlice";


function NavBar() {
  const cart = useSelector((state) => state.cart.cart);
  const navigate =useNavigate();
  const wishes = useSelector((state) => state.wishlist.wishes || []);
  const user_login =localStorage.getItem('token')
  const totalQuantity = Object.entries(cart).reduce((total,[itemId, quantity]) => total + quantity, 0);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(setCart([]));
    navigate('/')

  };
  // const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: "white" }}
      variant="light"
      sticky="top"
    >
      <Container style={{width:'100%'}}>
        <Navbar.Brand as={Link} to="/">
          YummY
          <img
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            style={{ marginLeft: "2px" }}
            alt=""
          />

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          style={{ justifyContent: "space-around" }}
          id="basic-navbar-nav"
        >
          <Nav className="navdisplay justify-content-start flex-grow-1 pe-4">
            <Nav.Link as={NavLink} exact to="/"  activeClassName="active">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/menu" activeClassName="active">
              Menu
            </Nav.Link>
            <Nav.Link as={NavLink} to="/connect" activeClassName="active">
              Contact
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" activeClassName="active">
              About
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/cart">
             <img
                src={Cart}
                width="30"
                height="30"
                className="d-inline-block align-center"
                style={{ marginLeft: "2px" }}
                alt="Cart"
             />
              <Badge
                style={{ position: "relative", bottom: "5px", left: "3px" ,width:'30px' ,height:'20px'}}
                pill
                bg="danger"
              >
                {totalQuantity}
              </Badge>
            </Nav.Link>
            <Nav.Link as={Link} to="/wishlist">
            <img
                src={Heart}
                width="30"
                height="30"
                className="d-inline-block align-center"
                style={{ marginLeft: "2px" }}
                alt="Heart"
             />
              <Badge
                style={{ position: "relative", bottom: "5px", left: "5px",width:'30px' ,height:'20px' }}
                pill
                bg="danger"
              >
                {wishes.length}
              </Badge>
            </Nav.Link>
            
          {user_login ? (
              <NavDropdown
                style={{ marginLeft: "40px" }}
                title= {
                  <>
                    Profile
                    <img
                      src={Profile}
                      className="d-inline-block align-center"
                      alt="Profile"
                      style={{ width: "30px", height: "30px", marginRight: "10px" }}
                    />
                    
                  </>
                }>
              
                
                <NavDropdown.Item onClick={()=>{
                  handleLogout()}}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
          ) : (
              <NavDropdown
                style={{ marginLeft: "70px" }}
                id="basic-nav-dropdown"
                title="Account"
              >
                <NavDropdown.Item as={Link} to="/login">
                  Login
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/signup">
                  Register
                </NavDropdown.Item>
              </NavDropdown>
          )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
