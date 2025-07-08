import React, { useState } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';

const ChatWidget: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [problemDescription, setProblemDescription] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [loadingAi, setLoadingAi] = useState(false);
    const [aiError, setAiError] = useState(false);
    const [messages, setMessages] = useState<{ from: 'user' | 'ai'; text: string }[]>([]);

    const getAiHelp = async () => {
        if (!problemDescription.trim()) {
            setAiResponse('Por favor, descreva o seu problema.');
            setMessages((prev) => [...prev, { from: 'ai', text: 'Por favor, descreva o seu problema.' }]);
            return;
        }

        setLoadingAi(true);
        setAiError(false);
        setAiResponse('');
        setMessages((prev) => [...prev, { from: 'user', text: problemDescription }]);

        try {
            const prompt = `O utilizador descreveu um problema de computador. Sugere um ou mais serviços da Aicon Informática que podem ajudar a resolver o problema. Se aplicável, oferece também 1-2 passos de resolução de problemas básicos que o utilizador pode tentar antes de contactar. Os serviços da Aicon são: Formatação e Otimização, Manutenção Preventiva, Suporte Empresarial, Montagem de PCs, Recuperação de Dados, Atendimento Emergencial. O problema descrito é: ${problemDescription}`;

            const payload = {
                contents: [{ role: "user", parts: [{ text: prompt }] }]
            };

            const apiKey = "AIzaSyAwhDQSFaCbMyNPussX3TDO5PM-FergDTE"; // Sua chave
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (result?.candidates?.[0]?.content?.parts?.[0]?.text) {
                const text = result.candidates[0].content.parts[0].text;
                setAiResponse(text);
                setMessages((prev) => [...prev, { from: 'ai', text }]);
            } else {
                throw new Error('Resposta malformada');
            }
        } catch (error) {
            console.error('Erro na IA:', error);
            setAiResponse('Erro ao obter resposta da IA. Tente novamente mais tarde.');
            setAiError(true);
            setMessages((prev) => [...prev, { from: 'ai', text: 'Erro ao obter resposta da IA. Tente novamente mais tarde.' }]);
        } finally {
            setLoadingAi(false);
            setProblemDescription('');
        }
    };

    return (
        <>
            {/* Botão flutuante */}
            <button
                onClick={() => setOpen(!open)}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: '#0d6efd',
                    color: '#fff',
                    borderRadius: '50%',
                    padding: '15px',
                    border: 'none',
                    zIndex: 9999,
                }}
            >
                {open ? FaTimes({}) : FaRobot({})}
            </button>

            {/* Chat popup */}
            {open && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '80px',
                        right: '20px',
                        width: '320px',
                        height: '420px',
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        display: 'flex',
                        flexDirection: 'column',
                        zIndex: 9999,
                    }}
                >
                    <div style={{ padding: '10px', backgroundColor: '#0d6efd', color: 'white', fontWeight: 'bold', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                        Ajuda com IA
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: '10px', fontSize: '14px' }}>
                        {messages.map((msg, idx) => (
                            <div key={idx} style={{ textAlign: msg.from === 'user' ? 'right' : 'left', marginBottom: '8px' }}>
                                <span
                                    style={{
                                        display: 'inline-block',
                                        padding: '8px',
                                        borderRadius: '8px',
                                        backgroundColor: msg.from === 'user' ? '#0d6efd' : '#f1f1f1',
                                        color: msg.from === 'user' ? 'white' : 'black',
                                        maxWidth: '90%',
                                    }}
                                >
                                    {msg.text}
                                </span>
                            </div>
                        ))}
                        {loadingAi && (
                            <div style={{ textAlign: 'left', fontStyle: 'italic', color: '#888' }}>Pensando...</div>
                        )}
                    </div>

                    <div style={{ padding: '10px', borderTop: '1px solid #ccc', display: 'flex', gap: '5px' }}>
                        <input
                            type="text"
                            placeholder="Descreva seu problema..."
                            value={problemDescription}
                            onChange={(e) => setProblemDescription(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && getAiHelp()}
                            disabled={loadingAi}
                            style={{
                                flex: 1,
                                padding: '8px',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                fontSize: '14px',
                            }}
                        />
                        <button
                            onClick={getAiHelp}
                            disabled={loadingAi}
                            style={{
                                backgroundColor: '#0d6efd',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '8px 12px',
                                cursor: 'pointer',
                            }}
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatWidget;