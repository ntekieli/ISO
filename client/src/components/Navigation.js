import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar() {
  return (
    <Navbar expand="lg" className="bg-body-four">
      <Container>
        <Navbar.Brand>ISO Network</Navbar.Brand>
        <Navbar.Toggle aria-controls="iso-navbar-nav" />
        <Navbar id="iso-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="posts">Posts</Nav.Link>
            <Nav.Link href="account">Account</Nav.Link>
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;