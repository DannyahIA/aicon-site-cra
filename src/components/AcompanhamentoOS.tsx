import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, Alert, Spinner, Collapse } from 'react-bootstrap';

const TOKEN_EXPIRATION_MS = 5 * 60 * 1000; // 5 minutos

const AcompanhamentoOS: React.FC = () => {
    const [cpf, setCpf] = useState('');
    const [token, setToken] = useState('');
    const [originalOsList, setOriginalOsList] = useState<any[]>([]); // lista original da API
    const [osList, setOsList] = useState<any[]>([]); // lista filtrada para exibição
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const [expandedIds, setExpandedIds] = useState<number[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const msgTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem('acompanhamento');
        if (saved) {
            const { cpf: savedCpf, token: savedToken, expiresAt } = JSON.parse(saved);
            if (new Date().getTime() < expiresAt) {
                setCpf(savedCpf);
                setToken(savedToken);
                validarToken(savedCpf, savedToken);
                iniciarTimer(expiresAt - new Date().getTime());
            } else {
                localStorage.removeItem('acompanhamento');
                mostrarInfo('Seu token expirou. Por favor, faça login novamente.');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const iniciarTimer = (ms: number) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            mostrarInfo('Sua sessão expirou. Por favor, valide o token novamente.');
            limparSessao();
        }, ms);
    };

    const mostrarInfo = (msg: string) => {
        setInfoMessage(msg);
        if (msgTimeoutRef.current) clearTimeout(msgTimeoutRef.current);
        msgTimeoutRef.current = setTimeout(() => setInfoMessage(''), 5000);
    };

    const limparSessao = () => {
        setCpf('');
        setToken('');
        setOriginalOsList([]);
        setOsList([]);
        setValidated(false);
        localStorage.removeItem('acompanhamento');
    };

    const validarToken = async (cpfValidar: string, tokenValidar: string) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:8000/validate-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cpf: cpfValidar, token: tokenValidar }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.detail || 'Erro desconhecido');
            }

            setOriginalOsList(data.lista);
            setOsList(data.lista);
            setValidated(true);

            // Salvar no localStorage com tempo de expiração
            const expiresAt = new Date().getTime() + TOKEN_EXPIRATION_MS;
            localStorage.setItem('acompanhamento', JSON.stringify({ cpf: cpfValidar, token: tokenValidar, expiresAt }));
            iniciarTimer(TOKEN_EXPIRATION_MS);
        } catch (err: any) {
            setError(err.message);
            setValidated(false);
            limparSessao();
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        validarToken(cpf, token);
    };

    const reenviarToken = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:8000/send-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cpf, enviar_por: 'sms' }), // ou 'whatsapp'
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.detail || 'Erro ao enviar token');
            mostrarInfo('Token enviado com sucesso!');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filtrarOs = (termo: string) => {
        const filtro = termo.toLowerCase();
        const filtrada = originalOsList.filter(os => {
            return (
                (os.numero_os?.toLowerCase() ?? '').includes(filtro) ||
                (os.status?.toLowerCase() ?? '').includes(filtro) ||
                (os.descricao?.toLowerCase() ?? '').includes(filtro) ||
                (os.data ?? '').includes(filtro)
            );
        });
        setOsList(filtrada);
    };

    const toggleExpand = (id: number) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    return (
        <section className="py-5 bg-light min-vh-100">
            <Container>
                <h2 className="text-center mb-4 fw-bold text-primary">Acompanhe sua Ordem de Serviço</h2>

                <div className="card mx-auto" style={{ maxWidth: 600 }}>
                    {!validated ? (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="cpf" className="mb-3">
                                <Form.Label>CPF</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Digite seu CPF"
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="token" className="mb-3">
                                <Form.Label>Token</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Digite o token recebido"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <div className="d-flex justify-content-between align-items-center">
                                <Button type="submit" variant="primary" disabled={loading}>
                                    {loading ? <Spinner size="sm" animation="border" /> : 'Consultar OS'}
                                </Button>
                                <Button variant="link" onClick={reenviarToken} disabled={loading || !cpf}>
                                    Reenviar token
                                </Button>
                            </div>

                            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                            {infoMessage && <Alert variant="info" className="mt-3">{infoMessage}</Alert>}
                        </Form>
                    ) : (
                        <>
                            <Button variant="secondary" className="mb-3" onClick={limparSessao}>
                                Sair
                            </Button>

                            <Form.Control
                                type="text"
                                placeholder="Filtrar ordens por número, status, descrição ou data"
                                className="mb-3"
                                onChange={e => filtrarOs(e.target.value)}
                            />

                            {osList.length === 0 && (
                                <Alert variant="warning">Nenhuma ordem encontrada com o filtro aplicado.</Alert>
                            )}

                            {osList.map((os, idx) => (
                                <div key={idx} className="mt-3 border p-3 rounded bg-white shadow-sm">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p><strong>Ordem de Serviço:</strong> {os.numero_os}</p>
                                            <p><strong>Data:</strong> {os.data}</p>
                                            <p><strong>Status:</strong> {os.status}</p>
                                        </div>
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => toggleExpand(idx)}
                                            aria-controls={`collapse-text-${idx}`}
                                            aria-expanded={expandedIds.includes(idx)}
                                        >
                                            {expandedIds.includes(idx) ? 'Ocultar detalhes' : 'Ver detalhes'}
                                        </Button>
                                    </div>

                                    <Collapse in={expandedIds.includes(idx)}>
                                        <div id={`collapse-text-${idx}`} className="mt-3">
                                            <p><strong>Descrição:</strong> {os.descricao}</p>
                                            {/* Aqui você pode adicionar imagens anexadas, mais detalhes etc */}
                                            {os.imagens && os.imagens.length > 0 && (
                                                <div className="d-flex flex-wrap gap-2">
                                                    {os.imagens.map((imgUrl: string, i: number) => (
                                                        <img
                                                            key={i}
                                                            src={imgUrl}
                                                            alt={`Imagem ${i + 1}`}
                                                            style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </Collapse>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </Container>
        </section>
    );
};

export default AcompanhamentoOS;
