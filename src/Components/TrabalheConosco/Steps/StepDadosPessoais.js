import React from 'react';

export default function StepDadosPessoais({ formData, onChange, onNext }) {
  return (
    <div>
      <h2 className="modal-title">Dados Pessoais</h2>
      <p className="modal-description">Preencha seus dados de contato.</p>

      <input
        type="text"
        name="nome"
        placeholder="Nome completo"
        value={formData.nome}
        onChange={onChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={onChange}
        required
      />
      <input
        type="tel"
        name="telefone"
        placeholder="Telefone"
        value={formData.telefone}
        onChange={onChange}
        required
      />

      <div className="modal-footer">
        <button className="btn-primary" onClick={onNext}>
          Próximo
        </button>
      </div>
    </div>
  );
}
