import React, { useState } from 'react';

const Acordeon = ({ id, title, isOpen, onToggle, children }) => {
  return (
    <div style={{ marginBottom: '1rem', border: '1px solid #eee', borderRadius: '0.5rem' }}>
      <div
        onClick={() => onToggle(id)}
        style={{
          cursor: 'pointer',
          background: '#f9f9f9',
          padding: '0.75rem 1rem',
          fontWeight: '600',
          borderRadius: '0.5rem 0.5rem 0 0',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {title}
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div style={{ padding: '1rem', fontSize: '0.95rem', lineHeight: '1.5' }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default function StepFinal({ formData, curriculo, onSubmit, onBack, sucesso, enviando }) {
  const [openId, setOpenId] = useState(null);

  const toggleAcordeon = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const {
    nome,
    email,
    telefone,
    endereco,
    areaInteresse,
    mensagem,
    instituicao,
    areaEstudo,
    inicioCurso,
    fimCurso,
    emAndamento,
    experiencias = [],
  } = formData;

  return (
    <div>
      <h2 className="modal-title">Confirmação</h2>
      <p className="modal-description">Confira seus dados antes de enviar:</p>

      <Acordeon
        id="dados"
        title="📇 Dados Pessoais"
        isOpen={openId === 'dados'}
        onToggle={toggleAcordeon}
      >
        <p><strong>Nome:</strong> {nome}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Telefone:</strong> {telefone}</p>
        <p><strong>Endereço:</strong> {endereco}</p>
        <p><strong>Área de Interesse:</strong> {areaInteresse}</p>
      </Acordeon>

      <Acordeon
        id="mensagem"
        title="📝 Mensagem"
        isOpen={openId === 'mensagem'}
        onToggle={toggleAcordeon}
      >
        <p>{mensagem || 'Não informado.'}</p>
      </Acordeon>

      <Acordeon
        id="curriculo"
        title="📎 Currículo"
        isOpen={openId === 'curriculo'}
        onToggle={toggleAcordeon}
      >
        <p>{curriculo ? curriculo.name : 'Não anexado'}</p>
      </Acordeon>

      <Acordeon
        id="formacao"
        title="🎓 Formação"
        isOpen={openId === 'formacao'}
        onToggle={toggleAcordeon}
      >
        <p><strong>Instituição:</strong> {instituicao}</p>
        <p><strong>Área de Estudo:</strong> {areaEstudo}</p>
        <p><strong>Início:</strong> {inicioCurso}</p>
        <p><strong>Fim:</strong> {emAndamento ? 'Em andamento' : fimCurso}</p>
      </Acordeon>

      <Acordeon
        id="experiencias"
        title="💼 Experiências"
        isOpen={openId === 'experiencias'}
        onToggle={toggleAcordeon}
      >
        {experiencias.length === 0 ? (
          <p>Não informado.</p>
        ) : (
          experiencias.map((exp, idx) => (
            <div key={idx} style={{ marginBottom: '1rem' }}>
              <p><strong>Empresa:</strong> {exp.empresa}</p>
              <p><strong>Área:</strong> {exp.area}</p>
              <p><strong>Descrição:</strong> {exp.descricao}</p>
              <p><strong>Início:</strong> {exp.dataInicio}</p>
              <p><strong>Fim:</strong> {exp.atual ? 'Emprego atual' : exp.dataFim}</p>
              <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '1rem 0' }} />
            </div>
          ))
        )}
      </Acordeon>

      <div className="modal-footer">
        <button className="btn-secondary" onClick={onBack}>Voltar</button>
        <button className="btn-primary" onClick={onSubmit} disabled={enviando}>
          {enviando ? 'Enviando...' : 'Enviar'}
        </button>
      </div>

      {sucesso && (
        <p style={{ color: '#1cc972', marginTop: '1rem' }}>
          ✅ Formulário enviado com sucesso!
        </p>
      )}
    </div>
  );
}
