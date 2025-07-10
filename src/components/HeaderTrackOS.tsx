import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HeaderTrackOS: React.FC = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/home" className="fw-bold fs-3 d-flex align-items-center">
                    <img
                        src={`${process.env.PUBLIC_URL}/aicon_new_logo.png`}
                        alt="Aicon Logo"
                        className="img-fluid me-2"
                        style={{ maxHeight: '60px', width: 'auto' }}
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/home" className="text-white mx-2">Ínicio</Nav.Link>
                        <Nav.Link as={Link} to="/compre" className="text-white mx-2 fw-semibold">🛒 Compre com a gente</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default HeaderTrackOS;
