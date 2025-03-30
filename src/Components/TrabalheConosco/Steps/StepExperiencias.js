import React, { useState } from 'react';
import { differenceInDays, parseISO } from 'date-fns';

export default function StepExperiencias({ formData, setFormData, onNext, onBack }) {
  const experiencias = formData.experiencias || [
    { empresa: '', area: '', descricao: '', dataInicio: '', dataFim: '', atual: false }
  ];

  const [expAberta, setExpAberta] = useState(0);

  const handleChange = (index, field, value) => {
    const novas = [...experiencias];
    novas[index][field] = value;

    if (field === 'atual' && value) {
      novas[index].dataFim = '';
    }

    setFormData({ ...formData, experiencias: novas });
  };

  const calcularDias = (inicio, fim, atual) => {
    if (!inicio) return null;
    const inicioDate = parseISO(inicio);
    const fimDate = atual ? new Date() : parseISO(fim);
    if (!fimDate || isNaN(fimDate)) return null;
    return differenceInDays(fimDate, inicioDate);
  };

  const addExperiencia = () => {
    if (experiencias.length >= 3) return;
    setFormData({
      ...formData,
      experiencias: [
        ...experiencias,
        { empresa: '', area: '', descricao: '', dataInicio: '', dataFim: '', atual: false }
      ]
    });
    setExpAberta(experiencias.length);
  };
  

  const removeExperiencia = (index) => {
    const novas = experiencias.filter((_, i) => i !== index);
    setFormData({ ...formData, experiencias: novas });
    if (expAberta === index) setExpAberta(null);
  };

  return (
    <div>
      <h2 className="modal-title">Experiências Relevantes</h2>
      <p className="modal-description">Adicione suas experiências profissionais mais relevantes:</p>

      {experiencias.map((exp, index) => {
        const dias = calcularDias(exp.dataInicio, exp.dataFim, exp.atual);
        const aberta = expAberta === index;

        return (
          <div
            key={index}
            style={{
              border: '1px solid #ddd',
              borderRadius: '0.5rem',
              marginBottom: '1rem',
              overflow: 'hidden'
            }}
          >
            {/* Header accordion */}
            <div
              style={{
                background: '#f3f3f3',
                padding: '0.8rem 1rem',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onClick={() => setExpAberta(aberta ? null : index)}
            >
              <strong>{exp.empresa || `Experiência ${index + 1}`}</strong>
              <span style={{ fontSize: '1.2rem' }}>{aberta ? '−' : '+'}</span>
            </div>

            {/* Conteúdo */}
            {aberta && (
              <div style={{ padding: '1rem' }}>
                <input
                  type="text"
                  placeholder="Nome da Empresa"
                  value={exp.empresa}
                  onChange={(e) => handleChange(index, 'empresa', e.target.value)}
                  className="input-form"
                />

                <input
                  type="text"
                  placeholder="Área de Atuação"
                  value={exp.area}
                  onChange={(e) => handleChange(index, 'area', e.target.value)}
                  className="input-form"
                />

                <div style={{ marginBottom: '0.5rem' }}>
                <textarea
                    placeholder="Descrição da Experiência"
                    value={exp.descricao}
                    onChange={(e) => {
                    const texto = e.target.value.slice(0, 150); // limite de 250
                    handleChange(index, 'descricao', texto);
                    }}
                    rows={3}
                    className="input-form"
                />
                <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>
                    {exp.descricao.length} / 150
                </div>
                </div>


                <label style={{ fontSize: '0.9rem', display: 'block' }}>Data de Início:</label>
                <input
                  type="date"
                  value={exp.dataInicio}
                  onChange={(e) => handleChange(index, 'dataInicio', e.target.value)}
                  className="input-form"
                />

                {!exp.atual && (
                  <>
                    <label style={{ fontSize: '0.9rem', display: 'block' }}>Data de Fim:</label>
                    <input
                      type="date"
                      value={exp.dataFim}
                      onChange={(e) => handleChange(index, 'dataFim', e.target.value)}
                      className="input-form"
                    />
                  </>
                )}

                <div
                  className="formacao-checkbox-wrapper"
                  style={{ marginBottom: '0.5rem' }}
                >
                  <input
                    type="checkbox"
                    id={`atual-${index}`}
                    checked={exp.atual}
                    onChange={(e) => handleChange(index, 'atual', e.target.checked)}
                    className="formacao-checkbox"
                  />
                  <label htmlFor={`atual-${index}`} className="formacao-label">
                    Emprego atual
                  </label>
                </div>

                {dias !== null && (
                  <p style={{ fontSize: '0.9rem', color: '#333', marginTop: '0.5rem' }}>
                    Duração: <strong>{dias} dias</strong>
                  </p>
                )}

                {index > 0 && (
                  <button
                    className="btn-secondary"
                    style={{ marginTop: '0.5rem', padding: '0.2rem 0.8rem', fontSize: '0.8rem' }}
                    onClick={() => removeExperiencia(index)}
                    type="button"
                  >
                    Remover
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}

        {experiencias.length < 3 ? (
        <button
            className="btn-secondary"
            style={{ marginBottom: '1rem' }}
            type="button"
            onClick={addExperiencia}
        >
            + Adicionar Experiência
        </button>
        ) : (
        <p style={{ color: '#ff4d4f', fontSize: '0.9rem', marginBottom: '1rem' }}>
            ⚠️ Limite máximo de <strong>3 experiências</strong> atingido.
        </p>
        )}


      <div className="modal-footer">
        <button className="btn-secondary" onClick={onBack}>Voltar</button>
        <button className="btn-primary" onClick={onNext}>Próximo</button>
      </div>
    </div>
  );
}
