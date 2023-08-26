import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/images/paytm_logo.png";
import Entry from "./Entry";
import { useStateContext } from "../context/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import ToastMessage from "./ToastMessage";

const NavBar = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin, showLogin, setShowLogin, showToast } =
    useStateContext();

  // Show the login modal
  const handleShowLogin = () => {
    setShowLogin(true);
  };

  // Close the login modal
  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  // Handle user logout
  const handleLogout = () => {
    setIsLogin(false);
    localStorage.removeItem("jwt");
    navigate("/");
  };

  return (
    <>
      {/* Navigation Bar */}
      <Navbar expand="lg" className="shadow-sm">
        <Container className="">
          <Navbar.Brand as={Link} to="/">
            <img
              src={logo}
              width="180"
              height="50"
              className="d-inline-block align-top img-fluid"
              alt="Paytm logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Display navigation links if user is logged in */}
            {isLogin && (
              <Nav className="me-auto fw-semibold">
                <Nav.Link as={Link} to="/fund-transfer" className="text-black">
                  Transaction
                </Nav.Link>
                <Nav.Link as={Link} to="/fund-request" className="text-black">
                  Requests
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" className="text-black">
                  Profile
                </Nav.Link>
              </Nav>
            )}
            <div className="ms-auto">
              {/* Show Login/Logout link */}
              <Nav className="text-black fw-semibold">
                <Nav.Link
                  onClick={isLogin ? handleLogout : handleShowLogin}
                  className="text-black"
                >
                  {isLogin ? "Logout" : "Login"}
                </Nav.Link>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      {/* Entry modal for login and registration */}
      <Entry show={showLogin} onHide={handleCloseLogin}></Entry>
      
      {/* Show toast message if showToast status is true */}
      {showToast.status && (
        <ToastMessage message="Login success" type="danger" />
      )}
    </>
  );
};

export default NavBar;
