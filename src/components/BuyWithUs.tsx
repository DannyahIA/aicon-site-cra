import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import '../styles/global.css';
import HeaderBuyWithUs from './HeaderBuyWithUs';

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: string;
    imagem: string;
}

const produtosMock: Produto[] = [
    { id: 1, nome: 'Mouse Gamer RGB', descricao: 'Alta precisão...', preco: 'R$ 149,90', imagem: '/produtos/mouse.jpg' },
    { id: 2, nome: 'Teclado Mecânico ABNT2', descricao: 'Switches silenciosos...', preco: 'R$ 349,00', imagem: '/produtos/teclado.jpg' },
    { id: 3, nome: 'Monitor 24" Full HD', descricao: 'Imagens nítidas...', preco: 'R$ 799,00', imagem: '/produtos/monitor.jpg' },
];

const BuyWithUs: React.FC = () => {
    return (
        <div className="compre-page bg-light">
            <HeaderBuyWithUs />
            {/* Banner de destaque */}
            <section className="banner-destaque">
                <img
                    src={`${process.env.PUBLIC_URL}/placeholder.png`}
                    alt="Destaques da Semana"
                    className="w-100 rounded shadow-sm"
                />
            </section>

            {/* Título de seleção */}
            <section className="py-4">
                <Container>
                    <h2 className="text-center fw-bold text-primary">
                        Seleção Aicon
                    </h2>

                    <Row className="mt-4 gx-4 gy-4 justify-content-center">
                        {[1, 2, 3, 4, 5].map((id) => (
                            <Col key={id} xs={12} sm={6} md={4} lg={2}>
                                <Card className="h-100 border-0 shadow-sm product-card">
                                    <Badge
                                        bg="danger"
                                        className="position-absolute top-0 start-0 m-2"
                                    >
                                        {`${Math.floor(10 + Math.random() * 40)} % OFF`}
                                    </Badge>
                                    <Card.Img
                                        variant="top"
                                        src={`${process.env.PUBLIC_URL}/placeholder_quadrado.png`}
                                        className="p-3"
                                    />
                                    <Card.Body className="pt-0">
                                        <Card.Title className="fs-6">
                                            Produto Exemplo {id} com Título Longo e Detalhes
                                        </Card.Title>
                                        <Button
                                            variant="primary"
                                            className="w-100 rounded-pill mt-2"
                                        >
                                            Adicionar ao carrinho
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* Categorias em botões */}
            <section className="categorias py-4 bg-white">
                <Container>
                    <h4 className="fw-bold text-center mb-4">Categorias</h4>
                    <Row className="justify-content-center gap-3">
                        {["Baterias", "Telas", "Teclados", "Fontes"].map((cat, idx) => (
                            <Button
                                key={idx}
                                variant="dark"
                                className="rounded-pill px-4 py-2 fw-semibold fs-6 categoria-btn"
                            >
                                {cat}
                            </Button>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* Destaque Novidades */}
            <section className="py-4 novidades-section">
                <Container>
                    <div className="bg-primary text-white rounded text-center p-4 shadow-sm fs-5 fw-bold">
                        🚀 NOVIDADES NO SITE! Confira os produtos que acabaram de chegar
                    </div>
                </Container>
            </section>

            {/* Footer básico institucional */}
            <footer className="bg-dark text-white py-5 mt-4">
                <Container>
                    <Row>
                        <Col md={3} className="mb-3">
                            <h6 className="fw-bold text-uppercase">Institucional</h6>
                            <ul className="list-unstyled">
                                <li>Sobre Nós</li>
                                <li>Carreira</li>
                                <li>Blog</li>
                            </ul>
                        </Col>
                        <Col md={3} className="mb-3">
                            <h6 className="fw-bold text-uppercase">Ajuda e Suporte</h6>
                            <ul className="list-unstyled">
                                <li>Contato</li>
                                <li>Trocas e Devoluções</li>
                                <li>FAQ</li>
                            </ul>
                        </Col>
                        <Col md={3} className="mb-3">
                            <h6 className="fw-bold text-uppercase">Políticas</h6>
                            <ul className="list-unstyled">
                                <li>Entrega</li>
                                <li>Privacidade</li>
                                <li>Serviços</li>
                            </ul>
                        </Col>
                        <Col md={3} className="mb-3">
                            <h6 className="fw-bold text-uppercase">Revenda</h6>
                            <ul className="list-unstyled">
                                <li>Seja nosso revendedor</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
};

export default BuyWithUs;
