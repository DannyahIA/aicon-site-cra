import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header: React.FC = () => {
    return (
        <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className="shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 d-flex align-items-center">
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
                        <Nav.Link href="#servicos" className="text-white mx-2">Serviços</Nav.Link>
                        <Nav.Link href="#sobre" className="text-white mx-2">Sobre</Nav.Link>
                        <Nav.Link href="#contato" className="text-white mx-2">Contato</Nav.Link>
                        <Nav.Link as={Link} to="/acompanhar-os" className="text-white mx-2">Acompanhar OS</Nav.Link>
                        <Nav.Link as={Link} to="/compre" className="text-white mx-2 fw-semibold">🛒 Compre com a gente</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
