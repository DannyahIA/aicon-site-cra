    import { Container, Button, Card, Row, Col } from 'react-bootstrap';
    import { FaWhatsapp, FaMapMarkerAlt, FaYoutube, FaInstagram } from 'react-icons/fa';
    import "bootstrap/dist/css/bootstrap.min.css";
    import ChatWidget from './ChatWidget';
    import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

    function Home() {
        return (
            <div className="App">
                <Header />
                <main>
                    {/* Hero */}
                    <section id="hero"
                        className="bg-primary text-white text-center py-5 py-lg-6"
                        style={{
                            backgroundImage: `${process.env.PUBLIC_URL}/hero_bg.png`,
                            backgroundSize: 'cover',       
                            backgroundPosition: 'center',  
                            backgroundRepeat: 'no-repeat' 
                        }}>
                        <Container className="my-5">
                            <Row className="justify-content-center">
                                <Col md={10} lg={8}>
                                    <h2 className="display-4 fw-bold mb-3 animate__animated animate__fadeInDown">
                                        Soluções em tecnologia com confiança e agilidade
                                    </h2>
                                    <p className="lead mb-4 animate__animated animate__fadeInUp">
                                        Formatamos, consertamos, instalamos, atendemos com agilidade!
                                    </p>
                                    <div className="d-grid gap-3 d-sm-flex justify-content-sm-center animate__animated animate__fadeIn">
                                        <Button
                                            variant="warning"
                                            size="lg"
                                            className="rounded-pill px-4 py-2 shadow-sm"
                                            href="https://wa.me/554133829576"
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                        >
                                            { FaWhatsapp({ className: "fs-4" }) } Solicitar atendimento
                                        </Button>
                                        <Link to="/acompanhar-os" style={{ textDecoration: 'none' }}>
                                            <Button
                                                color="dark"
                                                variant="outline-light"
                                                size="lg"
                                                className="rounded-pill px-4 py-2 shadow-sm"
                                            >
                                                Acompanhar Ordem de Serviço
                                            </Button>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>

                    {/* Serviços */}
                    <section id="servicos" className="py-5 py-lg-6 bg-light">
                        <Container>
                            <h2 className="text-center mb-5 fw-bold text-primary">Nossos Serviços</h2>
                            <Row xs={1} md={2} lg={3} className="g-4">
                                {[
                                    {
                                        title: 'Formatação e Otimização',
                                        desc: 'Deixe seu PC ou notebook como novo, com formatação limpa e rápida.',
                                        icon: '💻'
                                    },
                                    {
                                        title: 'Manutenção Preventiva',
                                        desc: 'Evite problemas com manutenção periódica e revisão de hardware.',
                                        icon: '🛠️'
                                    },
                                    {
                                        title: 'Suporte Empresarial',
                                        desc: 'Atendimento para empresas, com SLA e suporte remoto ou presencial.',
                                        icon: '🏢'
                                    },
                                    {
                                        title: 'Montagem de PCs',
                                        desc: 'Montagem personalizada para games, escritório ou uso geral.',
                                        icon: '🧩'
                                    },
                                    {
                                        title: 'Recuperação de Dados',
                                        desc: 'Tentativa de recuperação de arquivos perdidos de HDs, SSDs e pendrives.',
                                        icon: '💾'
                                    },
                                    {
                                        title: 'Atendimento Emergencial',
                                        desc: 'Problemas urgentes? Nós resolvemos rápido, onde você estiver.',
                                        icon: '⚡'
                                    }
                                ].map((servico, i) => (
                                    <Col key={i}>
                                        <Card
                                            className="h-100 text-center shadow-sm border-0 transform-on-hover"
                                            style={{ transition: 'transform 0.3s ease' }}
                                            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                                            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                                        >
                                            <Card.Body className="p-4">
                                                <div className="fs-1 mb-3 text-primary">{servico.icon}</div>
                                                <Card.Title className="fw-semibold mb-2">{servico.title}</Card.Title>
                                                <Card.Text className="text-muted">{servico.desc}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </section>

                    {/* Sobre Nós */}
                    <section id="sobre" className="py-5 py-lg-6 bg-white">
                        <Container className="text-center">
                            <Row className="justify-content-center">
                                <Col md={10} lg={8}>
                                    <h2 className="mb-4 fw-bold text-primary">Sobre a Aicon</h2>
                                    <p className="lead text-secondary mb-3">
                                        A Aicon nasceu em 2004 com um propósito claro: <strong>resolver os problemas mais difíceis e conquistar a confiança dos clientes com honestidade e dedicação</strong>.
                                    </p>
                                    <p className="lead text-secondary mb-3">
                                        Fundada por Marcos Almeida, a empresa nunca teve o lucro como objetivo principal, mas sim a <strong>excelência e o cuidado com cada atendimento</strong>.
                                    </p>
                                    <p className="lead text-secondary mb-3">
                                        Em 2023, fomos reconhecidos como a <strong>melhor assistência técnica da região</strong>, com 100% de satisfação, ética, pontualidade e o menor índice de retorno.
                                    </p>
                                    <p className="lead text-secondary">
                                        Somos movidos pela fé, gratidão e amor pelo que fazemos — e é assim que seguimos nossa jornada.
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </section>

                    {/* Contato */}
                    <section id="contato" className="py-5 py-lg-6 bg-light">
                        <Container>
                            <h2 className="text-center mb-5 fw-bold text-primary">Entre em Contato</h2>
                            <Row className="justify-content-center">
                                <div className="bg-white p-4 rounded shadow-sm h-100" style={{ maxWidth: 480, width: '100%' }}>
                                    <div className="d-flex justify-content-center justify-content-md-start gap-3">
                                        <a href="https://wa.me/554133829576" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                            { FaWhatsapp({ className: "text-success fs-3" }) }
                                        </a>
                                        <a href="https://www.youtube.com/@aiconinformatica4862" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                            { FaYoutube({ className: "text-danger fs-3" }) }
                                        </a>
                                        <a href="https://www.instagram.com/aiconbr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                            { FaInstagram({ className: "text-purple-600 fs-3" }) }
                                        </a>
                                    </div>
                                    <h3 className="fs-5 fw-semibold mt-4 mb-3 text-primary d-flex align-items-center">
                                        { FaMapMarkerAlt({ className: "me-2 text-info" }) } Endereço
                                    </h3>
                                    <div
                                        style={{
                                            position: 'relative',
                                            paddingBottom: '22.5%',
                                            height: 0,
                                            overflow: 'hidden',
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                        }}
                                    >
                                        <iframe
                                            title="Mapa Aicon"
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.7028926288694!2d-49.20678082458737!3d-25.53540577749368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce44cf3e8ea2f%3A0xe92cc9f8cc118fbb!2sR.%20Visconde%20do%20Rio%20Branco%2C%202737%20-%20Centro%2C%20S%C3%A3o%20Jos%C3%A9%20dos%20Pinhais%20-%20PR%2C%2083015-010!5e0!3m2!1spt-BR!2sbr!4v1720452146914!5m2!1spt-BR!2sbr"
                                            width="100%"
                                            height="100%"
                                            style={{ position: 'absolute', top: 0, left: 0, border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                    </div>
                                    <p className="mb-2 mt-3 fw-semibold text-center">
                                        Rua Visconde do Rio Branco, 2737 - Centro - São José dos Pinhais/PR
                                    </p>
                                    <a
                                        href="https://www.google.com/maps/search/?api=1&query=Rua Visconde do Rio Branco,+2737,+Centro,+S%C3%A3o+Jos%C3%A9+dos+Pinhais,+PR"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline-secondary btn-sm d-block mx-auto"
                                        style={{ maxWidth: 180 }}
                                    >
                                        Ver no Google Maps
                                    </a>
                                </div>
                            </Row>
                        </Container>
                    </section>
                </main>
                <ChatWidget />
                <Footer />
            </div>
        );
    }

    export default Home;
