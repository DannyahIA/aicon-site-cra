
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-white py-4 text-center">
            <p className="mb-0">
                © {new Date().getFullYear()} Aicon - Todos os direitos reservados.
            </p>
        </footer>
    );
}

export default Footer;