import React from 'react';

export default function StepAreaInteresse({ formData, onChange, onNext, onBack }) {
  return (
    <div>
      <h2 className="modal-title">Área de Interesse</h2>
      <p className="modal-description">Escolha a área que você deseja atuar:</p>

      <select
        name="areaInteresse"
        value={formData.areaInteresse || ''}
        onChange={onChange}
        required
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          border: '1px solid #ddd',
          background: '#f9f9f9',
          marginBottom: '1rem',
        }}
      >
        <option value="">Selecione uma área</option>
        <option value="Desenvolvimento">Desenvolvedor</option>
        <option value="Atendimento">Atendimento</option>
        <option value="Técnico de Campo">Técnico de Campo</option>
        <option value="Instalações">Instalações</option>
        <option value="Vendas">Vendas</option>
        <option value="Marketing">Marketing</option>
        <option value="Administrativo">Administrativo</option>
        <option value="Banco de Talentos">Banco de Talentos</option>
      </select>

      <div className="modal-footer">
        <button className="btn-secondary" onClick={onBack}>Voltar</button>
        <button className="btn-primary" onClick={onNext}>Próximo</button>
      </div>
    </div>
  );
}
