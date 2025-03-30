import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { buscarAreasDeEstudo } from '../../../Services/areaEstudoService';

export default function StepFormacao({ formData, onChange, onNext, onBack }) {
  const [areas, setAreas] = useState([]);
  const [emAndamento, setEmAndamento] = useState(formData.emAndamento || false);

  useEffect(() => {
    const fetchAreas = async () => {
      const data = await buscarAreasDeEstudo();

      if (!Array.isArray(data)) {
        console.warn('❌ Lista de áreas inválida:', data);
        setAreas([]);
        return;
      }

      const formatted = data.map(area => ({
        label: area,
        value: area
      }));

      console.log('✅ Áreas formatadas para Select:', formatted);
      setAreas(formatted);
    };

    fetchAreas();
  }, []);

  return (
    <div className="formacao-step">
      <h2 className="formacao-title">Formação</h2>
      <p className="formacao-description">Informe seus dados acadêmicos.</p>

      <input
        className="formacao-input"
        type="text"
        name="instituicao"
        placeholder="Instituição de Ensino"
        value={formData.instituicao || ''}
        onChange={onChange}
        required
      />

      <div className="formacao-select-wrapper">
        <CreatableSelect
          className="area-estudo-trabalhe-select"
          classNamePrefix="area-estudo-trabalhe"
          options={areas}
          isClearable
          isSearchable
          placeholder="Área de Estudo"
          onChange={(selected) =>
            onChange({ target: { name: 'areaEstudo', value: selected ? selected.value : '' } })
          }
          onCreateOption={(inputValue) =>
            onChange({ target: { name: 'areaEstudo', value: inputValue } })
          }
          value={
            formData.areaEstudo
              ? { label: formData.areaEstudo, value: formData.areaEstudo }
              : null
          }
          formatCreateLabel={(inputValue) => `Adicionar "${inputValue}"`}
          styles={{
            control: (base) => ({
              ...base,
              borderRadius: '0.5rem',
              borderColor: '#ccc',
              padding: '2px',
              boxShadow: 'none',
              '&:hover': {
                borderColor: '#aaa',
              },
            }),
          }}
        />
      </div>

      <label className="formacao-label">Data de Início:</label>
      <input
        className="formacao-input"
        type="date"
        name="inicioCurso"
        value={formData.inicioCurso || ''}
        onChange={onChange}
        required
      />

      {!emAndamento && (
        <>
          <label className="formacao-label">Data de Finalização:</label>
          <input
            className="formacao-input"
            type="date"
            name="fimCurso"
            value={formData.fimCurso || ''}
            onChange={onChange}
            required
          />
        </>
      )}

        <div className="formacao-checkbox-wrapper">
        <input
            type="checkbox"
            id="curso-andamento"
            className="formacao-checkbox"
            checked={emAndamento}
            onChange={(e) => {
            const value = e.target.checked;
            setEmAndamento(value);
            onChange({ target: { name: 'emAndamento', value } });
            if (value) {
                onChange({ target: { name: 'fimCurso', value: '' } });
            }
            }}
        />
        <label htmlFor="curso-andamento" className="formacao-label">
            Curso em andamento
        </label>
        </div>


      <div className="modal-footer">
        <button className="btn-secondary" onClick={onBack}>Voltar</button>
        <button className="btn-primary" onClick={onNext}>Próximo</button>
      </div>
    </div>
  );
}