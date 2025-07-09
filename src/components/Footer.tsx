import React from 'react';
import { Container } from 'react-bootstrap';
import { FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
            <Container className="py-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <p className="mb-2 mb-md-0">&copy; {new Date().getFullYear()} Aicon Informática. Todos os direitos reservados.</p>
                    <div className="d-flex gap-3">
                        <a
                            href="https://www.youtube.com/@aiconinformatica4862"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white fs-5"
                        >
                            {FaYoutube({ className: 'text-white' })}
                        </a>
                        <a
                            href="https://www.instagram.com/aiconbr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white fs-5"
                        >
                            {FaInstagram({ className: 'text-white' })}
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
