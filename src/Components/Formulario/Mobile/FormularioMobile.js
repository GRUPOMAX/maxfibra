import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../../../Styles/Formulario/Mobile/FormularioMobile.css";
import StepperMobile from "./StepperMobile";
import StepDadosPessoaisMobile from "./StepDadosPessoaisMobile";
import StepContatoMobile from "./StepContatoMobile";
import StepEnderecoMobile from "./StepEnderecoMobile";
import StepPlanoMobile from "./StepPlanoMobile";
import StepConfirmacaoMobile from "./StepConfirmacaoMobile";

const FormularioMobile = ({   
  setPlanoSelecionado,
  setStreamingSelecionado,
  setVencimentoSelecionado,
  planoInicial = "Gold",
  tipoDocumentoInicial = "CPF"
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    rg: "",
    dataNascimento: "",
    email: "",
    telefone1: "",
    telefone2: "",
    cidade: "",
    bairro: "",
    endereco: "",
    cep: "",
    numero: "",
    complemento: "",
    latitude: "",
    longitude: "",
    plano: planoInicial,
    tipoDocumento: tipoDocumentoInicial,
    streaming: "",
    vencimento: ""
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateFormData = (newData) => {
    setFormData(prevData => ({
      ...prevData,
      ...newData
    }));
  
    if (newData.plano !== undefined) {
      setPlanoSelecionado(newData.plano);
    }
  
    if (newData.streaming !== undefined) {
      setStreamingSelecionado(newData.streaming);
    }
  
    if (newData.vencimento !== undefined) {
      setVencimentoSelecionado(newData.vencimento);
    }
  };

  return (
    <div className="container-mobile">
      <StepperMobile step={step} />
      {step === 1 && <StepDadosPessoaisMobile nextStep={nextStep} updateFormData={updateFormData} formData={formData} />}
      {step === 2 && <StepContatoMobile nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />}
      {step === 3 && <StepEnderecoMobile nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />}
      {step === 4 && <StepPlanoMobile nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />}
      {step === 5 && <StepConfirmacaoMobile prevStep={prevStep} formData={formData} setFormData={setFormData} />}
      </div>
  );
};

export default FormularioMobile;
