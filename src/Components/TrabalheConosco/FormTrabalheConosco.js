import React, { useState } from 'react';
import StepDadosPessoais from './Steps/StepDadosPessoais';
import StepMensagem from './Steps/StepMensagem';
import StepUploadCurriculo from './Steps/StepUploadCurriculo';
import StepFinal from './Steps/StepFinal';
import StepAreaInteresse from './Steps/StepAreaInteresse';
import StepFormacao from './Steps/StepFormacao';
import StepExperiencias from './Steps/StepExperiencias';

import { enviarFormularioTrabalheConosco } from '../../Services/trabalheConoscoService';
import LogoText from '../../Assets/logo-text.svg'; // importa a logo

export default function FormTrabalheConosco({ onClose }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: '',
  });
  const [curriculo, setCurriculo] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = (file) => {
    setCurriculo(file);
  };

  const handleSubmit = async () => {
    setEnviando(true);
  
    const dados = new FormData();
  
    // Converte cada entrada do formData corretamente
    Object.entries(formData).forEach(([key, value]) => {
      // Se for booleano, transforma em string
      if (typeof value === 'boolean') {
        dados.append(key, value.toString());
      }
      // Se for um array ou objeto (ex: experiencias), transforma em JSON
      else if (typeof value === 'object') {
        dados.append(key, JSON.stringify(value));
      }
      // Normal: string, número, etc
      else {
        dados.append(key, value);
      }
    });
  
    if (curriculo) {
      dados.append('curriculo', curriculo);
    }
  
    try {
      await enviarFormularioTrabalheConosco(dados);
      setSucesso(true);
    } catch (err) {
      alert('Erro ao enviar');
      console.error('Erro no envio:', err);
    } finally {
      setEnviando(false);
    }
  };
  

  const steps = [
    <StepDadosPessoais formData={formData} onChange={handleChange} onNext={handleNext} />,
    <StepMensagem formData={formData} onChange={handleChange} onNext={handleNext} onBack={handleBack} />,
    <StepAreaInteresse formData={formData} onChange={handleChange} onNext={handleNext} onBack={handleBack} />,
    <StepUploadCurriculo curriculo={curriculo} onUpload={handleUpload} onNext={handleNext} onBack={handleBack} />,
    <StepFormacao formData={formData} onChange={handleChange} onNext={handleNext} onBack={handleBack} />,
    <StepExperiencias formData={formData} setFormData={setFormData} onNext={handleNext} onBack={handleBack} />,
    <StepFinal formData={formData} curriculo={curriculo} onSubmit={handleSubmit} onBack={handleBack} sucesso={sucesso} enviando={enviando} />,
  ];

  return (
    <div className="modal">
      <div className="modal-header">
        <img src={LogoText} alt="Logo" style={{ height: '5rem' }} />
      </div>

      <h1 style={{ fontSize: '1.5rem', fontWeight: '700', margin: '1rem 0' }}>Ficha de Cadastro</h1>

      <div className="modal-body">
        {steps[step]}
      </div>
    </div>
  );
}
