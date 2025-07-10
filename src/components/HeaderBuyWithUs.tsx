import React from 'react';
import { Container, Form, InputGroup, Button } from 'react-bootstrap';
import { FaSearch, FaUserCircle, FaShoppingCart, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/global.css';

const CompreHeader = () => {
    return (
        <header className="compre-header py-2">
            <Container fluid className="d-flex align-items-center justify-content-between">
                {/* Logo */}
                <Link to="/compre" className="navbar-brand text-white fw-bold fs-4 d-flex align-items-center">
                    <img src={`${process.env.PUBLIC_URL}/aicon_new_logo.png`} alt="Aicon" className="me-2" height={36} />
                </Link>

                {/* Barra de busca central */}
                <div className="flex-grow-1 px-3">
                    <Form className="w-100">
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Busque por modelo, marca, série, part number..."
                                className="search-input"
                            />
                            <Button variant="info" className="text-white">
                                {FaSearch({})}
                            </Button>
                        </InputGroup>
                    </Form>
                </div>

                {/* Usuário e carrinho */}
                <div className="d-flex align-items-center gap-3 text-white">
                    <div className="d-flex align-items-center user-login">
                        {FaUserCircle({size: 35})}
                        <div className="ms-2 small">
                            <div>Olá!</div>
                            <div className="d-flex align-items-center">
                                <span className="fw-semibold">Faça seu login</span>
                                {FaChevronDown({className: "ms-1", size: 10})}
                            </div>
                        </div>
                    </div>

                    {FaShoppingCart({size: 30, className: "cursor-pointer"})}
                </div>
            </Container>
        </header>
    );
};

export default CompreHeader;
