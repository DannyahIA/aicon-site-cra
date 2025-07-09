import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../styles/global.css';

const produtosMock = [
    {
        id: 1,
        nome: 'Mouse Gamer RGB',
        descricao: 'Alta precisão, design ergonômico, ideal para jogos e produtividade.',
        preco: 'R$ 149,90',
        imagem: '/produtos/mouse.jpg'
    },
    {
        id: 2,
        nome: 'Teclado Mecânico ABNT2',
        descricao: 'Switches silenciosos e iluminação personalizável.',
        preco: 'R$ 349,00',
        imagem: '/produtos/teclado.jpg'
    },
    {
        id: 3,
        nome: 'Monitor 24" Full HD',
        descricao: 'Imagem nítida e taxa de atualização de 75Hz para uma experiência suave.',
        preco: 'R$ 799,00',
        imagem: '/produtos/monitor.jpg'
    },
];

const CompreComAGente: React.FC = () => {
    return (
        <section className="py-5 bg-white min-vh-100">
            <Container>
                <h2 className="text-center mb-5 fw-bold text-primary">Compre com a Gente</h2>
                <Row className="g-4">
                    {produtosMock.map((produto) => (
                        <Col key={produto.id} xs={12} md={6} lg={4}>
                            <Card className="h-100 shadow-sm border-0">
                                <Card.Img variant="top" src={produto.imagem} alt={produto.nome} style={{ objectFit: 'cover', height: '220px' }} />
                                <Card.Body>
                                    <Card.Title className="fw-semibold text-primary">{produto.nome}</Card.Title>
                                    <Card.Text className="text-muted small">{produto.descricao}</Card.Text>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="fw-bold text-dark">{produto.preco}</span>
                                        <Button variant="outline-primary" size="sm">Ver detalhes</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default CompreComAGente;
