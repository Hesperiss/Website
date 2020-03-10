import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = () => (
	<Navbar bg="light" expand="lg" fixed="top">
		<Navbar.Brand className="mr-auto" href="/"><img alt="Accueil" src={process.env.PUBLIC_URL + '/favicon.ico'} style={{ maxWidth: '50px', marginTop: '-25%' }} /></Navbar.Brand>
		<Navbar.Toggle aria-controls="basic-navbar-nav" />
		<Navbar.Collapse id="basic-navbar-nav">
			<Nav>
				<Nav.Link href="/prescription">Prescription</Nav.Link>
				<Nav.Link href="/chat">Chat</Nav.Link>
				<Nav.Link href="/profile">Profile</Nav.Link>
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default NavBar;