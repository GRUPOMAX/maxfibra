import React, { useRef } from 'react';

export default function StepUploadCurriculo({ curriculo, onUpload, onNext, onBack }) {
  const inputRef = useRef();

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      onUpload(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <h2 className="modal-title">Currículo</h2>
      <p className="modal-description">Anexe seu currículo para análise.</p>

      <div className="upload-area" onClick={() => inputRef.current.click()}>
        <svg className="upload-area-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7z" />
          <path d="M5 18h14v2H5z" />
        </svg>
        <span className="upload-area-title">Arraste seu currículo aqui</span>
        <span className="upload-area-description">
          Ou <strong>clique aqui</strong> para selecionar um arquivo.
        </span>
        {curriculo && (
          <p style={{ marginTop: '1rem', fontWeight: 'bold', color: '#1cc972' }}>
            📎 {curriculo.name}
          </p>
        )}
        <input
          type="file"
          ref={inputRef}
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      <div className="modal-footer">
        <button className="btn-secondary" onClick={onBack}>Voltar</button>
        <button className="btn-primary" onClick={onNext}>Próximo</button>
      </div>
    </div>
  );
}
