import React from "react";
import { Navbar, Nav } from "react-bootstrap";

function Header(props) {
  const logger = async () => {
    try {
      const resp = await fetch("/logout");
      const data = await resp.json();
      if (data.success === true) {
        props.history.push("/");
      } else {
        props.history.push("/dashboard");
      }
    } catch (e) {
      console.log(e);
      props.history.push("/login");
    }
  };
  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Navbar.Brand href="#home"></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link onClick={logger} href="/login">
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
