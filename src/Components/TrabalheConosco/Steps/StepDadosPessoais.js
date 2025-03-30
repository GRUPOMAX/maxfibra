import React, { useState } from 'react';

export default function StepDadosPessoais({ formData, onChange, onNext }) {
  const [erro, setErro] = useState('');

  const validarCampos = () => {
    if (!formData.nome || !formData.email || !formData.telefone) {
      setErro('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setErro('');
    onNext();
  };

  return (
    <div>
      <h2 className="modal-title">Dados Pessoais</h2>
      <p className="modal-description">Preencha seus dados de contato.</p>

      <input
        type="text"
        name="nome"
        placeholder="Nome completo *"
        value={formData.nome}
        onChange={onChange}
      />
      <input
        type="email"
        name="email"
        placeholder="E-mail *"
        value={formData.email}
        onChange={onChange}
      />
      <input
        type="tel"
        name="telefone"
        placeholder="Telefone *"
        value={formData.telefone}
        onChange={onChange}
      />

      {erro && (
        <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.5rem' }}>
          ⚠️ {erro}
        </p>
      )}

      <div className="modal-footer">
        <button className="btn-primary" onClick={validarCampos}>
          Próximo
        </button>
      </div>
    </div>
  );
}
