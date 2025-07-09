import React, { useState } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

type Message = {
    from: 'user' | 'ai';
    text: string;
};

const ChatWidget: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [problemDescription, setProblemDescription] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [loadingAi, setLoadingAi] = useState(false);

    const getAiHelp = async () => {
        if (!problemDescription.trim()) {
            const text = 'Por favor, descreva o seu problema.';
            setMessages((prev) => [...prev, { from: 'ai', text }]);
            return;
        }

        setMessages((prev) => [...prev, { from: 'user', text: problemDescription }]);
        setLoadingAi(true);

        try {
            const prompt = `O utilizador descreveu um problema de computador. Sugere um ou mais serviços da Aicon Informática que podem ajudar a resolver o problema. Se aplicável, oferece também 1-2 passos de resolução de problemas básicos que o utilizador pode tentar antes de contactar. Os serviços da Aicon são: Formatação e Otimização, Manutenção Preventiva, Suporte Empresarial, Montagem de PCs, Recuperação de Dados, Atendimento Emergencial. O problema descrito é: ${problemDescription}`;

            const payload = {
                contents: [{ role: "user", parts: [{ text: prompt }] }]
            };

            const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAwhDQSFaCbMyNPussX3TDO5PM-FergDTE", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || 'Resposta não disponível no momento.';
            setMessages((prev) => [...prev, { from: 'ai', text }]);
        } catch (err) {
            setMessages((prev) => [...prev, {
                from: 'ai',
                text: 'Erro ao obter resposta da IA. Tente novamente mais tarde.'
            }]);
        } finally {
            setLoadingAi(false);
            setProblemDescription('');
        }
    };

    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center shadow"
                style={{
                    width: '56px',
                    height: '56px',
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 9999
                }}
            >
                {open ? FaTimes({size: 18}) : FaRobot({size: 18})}
            </button>

            {open && (
                <div
                    className="shadow-lg border rounded-4"
                    style={{
                        position: 'fixed',
                        bottom: '90px',
                        right: '20px',
                        width: '340px',
                        height: '460px',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        flexDirection: 'column',
                        zIndex: 9999,
                        fontFamily: `'Inter', sans-serif`
                    }}
                >
                    <div className="bg-primary text-white p-3 rounded-top-4 fw-semibold d-flex align-items-center">
                        {FaRobot({ className: "me-2" })} Ajuda com IA
                    </div>

                    <div className="flex-grow-1 p-3 overflow-auto" style={{ fontSize: '0.9rem' }}>
                        {messages.map((msg, i) => (
                            <div key={i} className={`mb-2 text-${msg.from === 'user' ? 'end' : 'start'}`}>
                                <span className={`px-3 py-2 d-inline-block rounded-pill shadow-sm ${msg.from === 'user' ? 'bg-primary text-white' : 'bg-light text-dark'}`}>
                                    {msg.text}
                                </span>
                            </div>
                        ))}
                        {loadingAi && <div className="text-muted small fst-italic">Pensando...</div>}
                    </div>

                    <div className="d-flex border-top px-2 py-2">
                        <input
                            type="text"
                            className="form-control border-0 rounded-pill me-2 shadow-sm"
                            placeholder="Descreva seu problema..."
                            value={problemDescription}
                            onChange={(e) => setProblemDescription(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && getAiHelp()}
                            disabled={loadingAi}
                        />
                        <button
                            className="btn btn-outline-primary rounded-pill px-3 d-flex align-items-center justify-content-center"
                            onClick={getAiHelp}
                            disabled={loadingAi}
                        >
                            {FaPaperPlane({size: 14})} 
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatWidget;
