import React, { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/pt-br"; // Adiciona o suporte ao português
import "../../../Styles/Formulario/Mobile/StepDadosPessoaisMobile.css";

const StepDadosPessoaisMobile = ({ nextStep, updateFormData, formData }) => {
  const [cpfValido, setCpfValido] = useState(true);
  const [formCompleto, setFormCompleto] = useState(false);
  const [rgValido, setRgValido] = useState(true);
  const [cpfResponsavelValido, setCpfResponsavelValido] = useState(true);
  const [cnpjValido, setCnpjValido] = useState(true);
  const [tipoDocumento, setTipoDocumento] = useState(formData.tipoDocumento || "CPF");
  const [maxDate, setMaxDate] = useState(dayjs().subtract(18, "year"));
  const [isTextInput, setIsTextInput] = useState(false);
  const [dataNascimento, setDataNascimento] = useState(formData.dataNascimento || "");

  useEffect(() => {
    const isCNPJ = tipoDocumento === "CNPJ";
    const camposPreenchidos = isCNPJ
      ? formData.nome?.trim() &&
        formData.cpf?.trim() &&
        formData.ie?.trim() &&
        formData.responsavel?.trim() &&
        formData.cpfResponsavel?.trim() &&
        formData.dataNascimentoResponsavel?.trim()
      : formData.nome?.trim() &&
        formData.cpf?.trim() &&
        formData.rg?.trim() &&
        formData.dataNascimento?.trim();

    setFormCompleto(
      Boolean(
        camposPreenchidos &&
          ((isCNPJ && cnpjValido && cpfResponsavelValido) || (!isCNPJ && cpfValido))
      )
    );
  }, [formData, cpfValido, cnpjValido, cpfResponsavelValido, tipoDocumento]);

  const formatarCNPJ = (valor) => {
    let cnpj = valor.replace(/\D/g, "");
    if (cnpj.length > 14) cnpj = cnpj.slice(0, 14);
  
    return cnpj
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  };
  


  // 🔥 Função para formatar o CPF automaticamente
  const formatarCPF = (valor) => {
    let cpf = valor.replace(/\D/g, ""); // Remove tudo que não for número
    //if (cpf.length > 11) cpf = cpf.slice(0, 11); // Limita a 11 dígitos

    if (cpf.length <= 3) return cpf;
    if (cpf.length <= 6) return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
    if (cpf.length <= 9) return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
  };

  const validarRG = (rg) => {
    if (!rg) return false;
  
    // Remove tudo que não for número ou 'X'
    const rgLimpo = rg.replace(/[^\dXx]/g, "").toUpperCase();
  
    // Tem que ter 9 dígitos
    if (rgLimpo.length !== 9) return false;
  
    const corpo = rgLimpo.slice(0, 8);
    const digito = rgLimpo.slice(8);
  
    let soma = 0;
    let peso = 2;
  
    for (let i = 7; i >= 0; i--) {
      soma += parseInt(corpo[i]) * peso;
      peso++;
    }
  
    let resto = soma % 11;
    let dvCalculado;
  
    if (resto === 10) {
      dvCalculado = 'X';
    } else if (resto === 11 || resto === 0) {
      dvCalculado = '0';
    } else {
      dvCalculado = String(resto);
    }
  
    return dvCalculado === digito;
  };

  const validarCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/[^\d]+/g, '');
  
    if (!cnpj || cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
  
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
  
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
  
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;
  
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
  
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
  
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return resultado === parseInt(digitos.charAt(1));
  };
  


  // 🔥 Função para validar CPF (algoritmo oficial)
  const validarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, ""); // Remove não números
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false; // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)

    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf[10]);
  };

  // 🔥 Quando o usuário digita, formata e valida o CPF
  const handleCPFChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    const isCNPJ = input.length > 11;
  
    let formatted;
  
    if (isCNPJ) {
      setTipoDocumento("CNPJ");
      formatted = formatarCNPJ(input);
      const valido = validarCNPJ(input); // 🔥 valida o CNPJ bruto
      setCnpjValido(valido);
      setCpfValido(true); // limpa a outra validação
      updateFormData({ cpf: formatted, tipoDocumento: "CNPJ" });
    } else {
      setTipoDocumento("CPF");
      formatted = formatarCPF(input);
      const valido = validarCPF(formatted);
      setCpfValido(valido);
      setCnpjValido(true); // limpa a outra validação
      updateFormData({ cpf: formatted, tipoDocumento: "CPF" });
    }
  };

  const handleCPFResponsavelChange = (e) => {
    const valor = e.target.value;
    const cpfFormatado = formatarCPF(valor);
    const valido = validarCPF(cpfFormatado);
    setCpfResponsavelValido(valido);
    updateFormData({ cpfResponsavel: cpfFormatado });
  };

  const handleTextChange = (e) => {
    let valor = e.target.value.replace(/\D/g, "");
    if (valor.length > 8) valor = valor.slice(0, 8);
    if (valor.length >= 2) valor = `${valor.slice(0, 2)}/${valor.slice(2)}`;
    if (valor.length >= 5) valor = `${valor.slice(0, 5)}/${valor.slice(5)}`;
    setDataNascimento(valor);
    updateFormData({ dataNascimento: valor });
  };






  return (
    <div className="step-container-mobile">
      <h2>Dados Pessoais</h2>
      <label>{tipoDocumento === "CNPJ" ? "Razão Social *" : "Nome Completo *"}</label>
      <input type="text" value={formData.nome} onChange={(e) => updateFormData({ nome: e.target.value })} required />

      <label>{tipoDocumento === "CNPJ" ? "CNPJ *" : "CPF ou CNPJ"}</label>
      <input type="text" value={formData.cpf} onChange={handleCPFChange} required placeholder={tipoDocumento === "CNPJ" ? "00.000.000/0000-00" : "000.000.000-00"} maxLength="18" className={cpfValido ? "" : "input-invalido"} />
      {!cpfValido && <span className="erro-cpf">CPF inválido!</span>}
      {!cnpjValido && tipoDocumento === "CNPJ" && <span className="erro-cpf">CNPJ inválido!</span>}

      {tipoDocumento === "CPF" && (
        <>
          <label>RG *</label>
          <input type="text" value={formData.rg} onChange={(e) => updateFormData({ rg: e.target.value })} required />

          <div className="data-nascimento-container1">
            <label>Data de Nascimento</label>
            <span className="alternar-modo" onClick={() => setIsTextInput(!isTextInput)}>
              {isTextInput ? "Selecionar" : "Digitar"}
            </span>
          </div>

          {isTextInput ? (
            <input type="text" value={dataNascimento} onChange={handleTextChange} placeholder="DD/MM/AAAA" maxLength="10" />
          ) : (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
              <DatePicker value={dataNascimento ? dayjs(dataNascimento) : null} onChange={(date) => {
                const formattedDate = date ? date.format("YYYY-MM-DD") : "";
                setDataNascimento(formattedDate);
                updateFormData({ dataNascimento: formattedDate });
              }} format="DD/MM/YYYY" maxDate={maxDate} slotProps={{ textField: { fullWidth: true, placeholder: "DD/MM/AAAA" } }} />
            </LocalizationProvider>
          )}
        </>
      )}

      {tipoDocumento === "CNPJ" && (
        <>
          <label>IE (Inscrição Estadual)</label>
          <input type="text" value={formData.ie} onChange={(e) => updateFormData({ ie: e.target.value })} />
          <div>
              <label>Data de Abertura da Empresa</label>
              <input
                type="date"
                value={formData.dataAberturaEmpresa || ""}
                onChange={(e) => updateFormData({ dataAberturaEmpresa: e.target.value })}
              />
            </div>
          <label>Responsável Legal</label>
          <input type="text" value={formData.responsavel} onChange={(e) => updateFormData({ responsavel: e.target.value })} />
          <label>CPF do Responsável</label>
          <input type="text" value={formData.cpfResponsavel} onChange={handleCPFResponsavelChange} placeholder="000.000.000-00" maxLength="14" className={cpfResponsavelValido ? "" : "input-invalido"} />
          {!cpfResponsavelValido && <span className="erro-cpf">CPF do responsável inválido!</span>}
          <label>Data de Nascimento do Responsável</label>
          <input className="date" type="date" value={formData.dataNascimentoResponsavel} onChange={(e) => updateFormData({ dataNascimentoResponsavel: e.target.value })} />
        </>
      )}

      <div className="button-group-mobileForm">
        <button className={`botao-proximo ${formCompleto ? "botao-habilitado" : "botao-desabilitado"}`} onClick={nextStep} disabled={!formCompleto}>
          Próximo
        </button>
      </div>
    </div>
  );
};

export default StepDadosPessoaisMobile;
