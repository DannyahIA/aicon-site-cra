import React, { useState } from 'react';

type ConsultaTipo = 'uma' | 'todas';

const AcompanhamentoOS = () => {
    const [consultaTipo, setConsultaTipo] = useState<ConsultaTipo>('uma');
    const [cpf, setCpf] = useState('');
    const [numeroOs, setNumeroOs] = useState('');
    const [tokenEnviado, setTokenEnviado] = useState(false);
    const [token, setToken] = useState('');
    const [tokenValidado, setTokenValidado] = useState(false);
    const [erro, setErro] = useState('');
    const [osData, setOsData] = useState<any>(null);
    const [listaOs, setListaOs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [enviarPor, setEnviarPor] = useState<'sms' | 'whatsapp'>('sms');

    const backendUrl = 'http://127.0.0.1:8000'; // ajuste para sua URL do backend

    const enviarToken = async () => {
        setErro('');
        if (!cpf.trim() || (consultaTipo === 'uma' && !numeroOs.trim())) {
            setErro('Preencha os campos obrigatórios');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${backendUrl}/send-token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cpf,
                    numero_os: consultaTipo === 'uma' ? numeroOs : undefined,
                    enviar_por: enviarPor,
                }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.detail || data.error || 'Erro ao enviar token');

            setTokenEnviado(true);
        } catch (e: any) {
            setErro(e.message);
        } finally {
            setLoading(false);
        }
    };

    const validarToken = async () => {
        setErro('');
        if (!token.trim()) {
            setErro('Informe o token enviado');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${backendUrl}/validate-token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cpf,
                    numero_os: consultaTipo === 'uma' ? numeroOs : undefined,
                    token,
                }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.detail || data.error || 'Token inválido');

            if (consultaTipo === 'uma') {
                setOsData(data.os);
            } else {
                setListaOs(data.lista);
            }
            setTokenValidado(true);
        } catch (e: any) {
            setErro(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
            <h2>Acompanhar Ordem de Serviço</h2>

            {!tokenEnviado && (
                <>
                    <div>
                        <label>
                            <input
                                type="radio"
                                checked={consultaTipo === 'uma'}
                                onChange={() => {
                                    setConsultaTipo('uma');
                                    setNumeroOs('');
                                    setOsData(null);
                                    setListaOs([]);
                                    setTokenValidado(false);
                                    setToken('');
                                }}
                            />
                            Consultar 1 OS específica
                        </label>
                        <label style={{ marginLeft: 20 }}>
                            <input
                                type="radio"
                                checked={consultaTipo === 'todas'}
                                onChange={() => {
                                    setConsultaTipo('todas');
                                    setNumeroOs('');
                                    setOsData(null);
                                    setListaOs([]);
                                    setTokenValidado(false);
                                    setToken('');
                                }}
                            />
                            Consultar todas as OS do CPF
                        </label>
                    </div>

                    <div style={{ marginTop: 20 }}>
                        <label>CPF:</label><br />
                        <input
                            type="text"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            placeholder="Digite seu CPF"
                            style={{ width: '100%', padding: 8, fontSize: 16 }}
                        />
                    </div>

                    {consultaTipo === 'uma' && (
                        <div style={{ marginTop: 20 }}>
                            <label>Número da OS:</label><br />
                            <input
                                type="text"
                                value={numeroOs}
                                onChange={(e) => setNumeroOs(e.target.value)}
                                placeholder="Digite o número da OS"
                                style={{ width: '100%', padding: 8, fontSize: 16 }}
                            />
                        </div>
                    )}

                    <div style={{ marginTop: 20 }}>
                        <label>Enviar código por:</label><br />
                        <select
                            value={enviarPor}
                            onChange={(e) => setEnviarPor(e.target.value as 'sms' | 'whatsapp')}
                            style={{ width: '100%', padding: 8, fontSize: 16 }}
                        >
                            <option value="sms">SMS</option>
                            <option value="whatsapp">WhatsApp</option>
                        </select>
                    </div>

                    <button
                        onClick={enviarToken}
                        style={{ marginTop: 20, padding: '8px 16px', fontSize: 16 }}
                        disabled={loading}
                    >
                        {loading ? 'Enviando...' : 'Enviar código de verificação'}
                    </button>
                </>
            )}

            {tokenEnviado && !tokenValidado && (
                <div style={{ marginTop: 20 }}>
                    <label>Digite o código enviado:</label><br />
                    <input
                        type="text"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="Código de verificação"
                        style={{ width: '100%', padding: 8, fontSize: 16 }}
                    />
                    <button
                        onClick={validarToken}
                        style={{ marginTop: 20, padding: '8px 16px', fontSize: 16 }}
                        disabled={loading}
                    >
                        {loading ? 'Validando...' : 'Validar código'}
                    </button>
                </div>
            )}

            {erro && <p style={{ color: 'red' }}>{erro}</p>}

            {tokenValidado && consultaTipo === 'uma' && osData && (
                <div style={{ marginTop: 20, border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
                    <h3>Status da OS</h3>
                    <p><strong>Status:</strong> {osData.status}</p>
                    <p><strong>Descrição:</strong> {osData.descricao}</p>
                </div>
            )}

            {tokenValidado && consultaTipo === 'todas' && listaOs.length > 0 && (
                <div style={{ marginTop: 20 }}>
                    <h3>Ordens de Serviço</h3>
                    <ul>
                        {listaOs.map((os) => (
                            <li key={os.id}>
                                <strong>{os.status}</strong> — {os.descricao}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AcompanhamentoOS;
