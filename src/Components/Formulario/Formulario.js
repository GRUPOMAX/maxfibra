import React, { useState, useEffect } from "react";
import "../../Styles/Formulario/Formulario.css";
import Stepper from "./Stepper";
import StepDadosPessoais from "./StepDadosPessoais";
import StepContato from "./StepContato";
import StepEndereco from "./StepEndereco";
import StepPlano from "./StepPlano";
import StepConfirmacao from "./StepConfirmacao";

// Importação dos componentes mobile
import StepDadosPessoaisMobile from "./Mobile/StepDadosPessoaisMobile";
import StepContatoMobile from "./Mobile/StepContatoMobile";
import StepEnderecoMobile from "./Mobile/StepEnderecoMobile";
import StepPlanoMobile from "./Mobile/StepPlanoMobile";
import StepConfirmacaoMobile from "./Mobile/StepConfirmacaoMobile";

const Formulario = ({
  setPlanoSelecionado,
  setStreamingSelecionado,
  setVencimentoSelecionado,
  planoInicial = "Gold",
  tipoDocumentoInicial = "CPF",
  setDesconto   // 🔥 Adiciona aqui!
}) => {
  
  const [step, setStep] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Detecta mobile automaticamente

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className={`container ${isMobile ? "mobile" : ""}`}>
      <div className="formulario-container">
        <Stepper step={step} isMobile={isMobile} />
        
        {isMobile ? (
          <>
            {step === 1 && <StepDadosPessoaisMobile nextStep={nextStep} updateFormData={updateFormData} formData={formData} />}
            {step === 2 && <StepContatoMobile nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />}
            {step === 3 && <StepEnderecoMobile nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />}
            {step === 4 && <StepPlanoMobile nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} tipoDocumento={formData.tipoDocumento} setDesconto={setDesconto} />}
            {step === 5 && <StepConfirmacaoMobile prevStep={prevStep} formData={formData} setFormData={setFormData} />}
            </>
        ) : (
          <>
            {step === 1 && <StepDadosPessoais nextStep={nextStep} updateFormData={updateFormData} formData={formData} />}
            {step === 2 && <StepContato nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />}
            {step === 3 && <StepEndereco nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />}
            {step === 4 && <StepPlano nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData}  tipoDocumento={formData.tipoDocumento} setDesconto={setDesconto} />}
            {step === 5 && <StepConfirmacao prevStep={prevStep} formData={formData} setFormData={setFormData} />}
            </>
        )}
      </div>
    </div>
  );
};

export default Formulario;
