import React, { Component } from 'react'
import { Navbar, Container , Nav } from 'react-bootstrap'
import { logout } from '../firebase'

export default class Navbarcomp extends Component {
  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="/">Academic Result</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/login">Faculty</Nav.Link>
        <Nav.Link href="/detail">Student</Nav.Link>
        <Nav.Link href="/signup">Sign up</Nav.Link>
        <button onClick={()=> logout()}>Log Out</button>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

      </div>
    )
  }
}
