import React from 'react';

export default function StepMensagem({ formData, onChange, onNext, onBack }) {
  return (
    <div>
      <h2 className="modal-title">Mensagem</h2>
      <p className="modal-description">Conte um pouco sobre você ou sua motivação.</p>

      <textarea
        name="mensagem"
        placeholder="Por que você quer fazer parte da nossa equipe?"
        value={formData.mensagem}
        onChange={onChange}
        rows="4"
        required
      />

      <div className="modal-footer">
        <button className="btn-secondary" onClick={onBack}>Voltar</button>
        <button className="btn-primary" onClick={onNext}>Próximo</button>
      </div>
    </div>
  );
}
