import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function ResponsiveNavbar() {
  return (
    <Navbar expand="lg" className="navbar" fixed="top" variant="dark">
      <Container>
        <Navbar.Brand href="#home" className="navbar-header">
          Jackie
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto navbar-menu">
            <Nav.Link href="#about">about me</Nav.Link>
            <Nav.Link href="#projects">my work</Nav.Link>
            <Nav.Link href="#contact">get in touch</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ResponsiveNavbar;
