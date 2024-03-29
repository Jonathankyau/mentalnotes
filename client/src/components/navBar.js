import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function Header({ user, Logout }) {
  const navigate = useNavigate();

  const LogoutHandler = () => {
    Logout();
    navigate("/signin");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">increMental</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link active" to="/">
              Profile <i className="fa fa-home" />
            </Link>
          </Nav>
          <Nav className="ms-auto">
            {!user ? (
              <>
                <Link className="btn btn-outline" to="/signin">
                  {" "}
                  Login <i className="fas fa-sign-in-alt" />
                </Link>
                <Link className="btn btn-outline" to="/signup">
                  {" "}
                  Register <i className="fa fa-user-plus" />
                </Link>
              </>
            ) : (
              <Link className="btn btn-outline" to="#" onClick={LogoutHandler}>
                {" "}
                Logout <i className="fas fa-sign-out-alt" />
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;