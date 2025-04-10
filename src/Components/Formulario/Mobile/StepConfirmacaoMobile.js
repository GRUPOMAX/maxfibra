import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "../../../Styles/Formulario/Mobile/StepConfirmacaoMobile.css";
import FormularioService from "../../../Services/FormularioService"; // 🔥 Importa o service
import ModalConfirmacao from "../ModalConfirmacao"; // ajuste o caminho se necessário
import WebhookService from "../../../Services/WebhookService"; // 👈 novo service

const StepConfirmacaoMobile = ({ prevStep, formData, setFormData  }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [loading, setLoading] = useState(false); // 🔥 Estado de loading
    const [mostrarModal, setMostrarModal] = useState(false);
    const [protocoloGerado, setProtocoloGerado] = useState("");
    const isEmpresa = formData.tipoDocumento === "CNPJ";


  // Alterna visibilidade da seção
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // 🔥 Formata a data de nascimento corretamente antes de exibir
  const formatarData = (data) => (data ? dayjs(data).format("DD/MM/YYYY") : "Não informado");
  
  
  const handleSubmit = async () => {
    setLoading(true);
  
    if (!formData.vendedor || !formData.vendedorEmail) {
      alert("Erro: O vendedor e o e-mail do vendedor são obrigatórios!");
      setLoading(false);
      return;
    }
  
    const dadosCorrigidos = {
      ...formData,
      endereco: formData.endereco?.trim() || formData.rua?.trim() || "",
      rua: formData.rua?.trim() || formData.endereco?.trim() || "",
      telefone1: formData.telefone1?.trim() || "N/A",
      telefone3: formData.telefone3?.trim() || "",
      latitude: formData.latitude ? String(formData.latitude) : "",
      longitude: formData.longitude ? String(formData.longitude) : "",
      vendedorEmail: formData.vendedorEmail,
    };
  
    Object.keys(dadosCorrigidos).forEach((key) => {
      if (typeof dadosCorrigidos[key] === "string") {
        dadosCorrigidos[key] = dadosCorrigidos[key].trim();
      }
    });
  
    const camposObrigatorios = [
      "nome", "cpf", "telefone1", "email", 
      "cidade", "bairro", "rua", "cep", "numero", 
      "vendedor", "vendedorEmail"
    ];
    const camposFaltando = camposObrigatorios.filter((campo) => !dadosCorrigidos[campo]);
  
    if (camposFaltando.length > 0) {
      alert(`⚠️ Os seguintes campos estão vazios e são obrigatórios:\n\n${camposFaltando.join("\n")}`);
      setLoading(false);
      return;
    }
  
    try {
      const response = await FormularioService.enviarFormulario(dadosCorrigidos);
  
      // ✅ Envia para o webhook do n8n
      await WebhookService.enviarParaWebhook(dadosCorrigidos);
  
      // ✅ Mostra o modal de sucesso
      setProtocoloGerado(response.protocolo);
      setMostrarModal(true);
  
    } catch (error) {
      console.error("❌ Erro ao enviar formulário:", error);
      alert("❌ Erro ao enviar o cadastro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  
  





  

  return (
    <div className="step-container-mobile">
      <h2>Confirmação</h2>

      {/* 🔹 DADOS PESSOAIS */}
      <div className="accordion">
        <div className="accordion-header" onClick={() => toggleSection("dadosPessoais")}>
          <h3>Dados Pessoais</h3>
          {expandedSection === "dadosPessoais" ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {expandedSection === "dadosPessoais" && (
          <div className="accordion-content">
            <p><strong>{isEmpresa ? "CNPJ" : "CPF"}:</strong> {formData.cpf}</p>
            <p><strong>Nome:</strong> {formData.nome}</p>

            {!isEmpresa ? (
              <>
                <p><strong>RG:</strong> {formData.rg}</p>
                <p><strong>Data de Nascimento:</strong> {formatarData(formData.dataNascimento)}</p>
              </>
            ) : (
              <>
                <p><strong>Nome Fantasia:</strong> {formData.nomeFantasia || "Não informado"}</p>
                <p><strong>IE:</strong> {formData.ie || "Não informado"}</p>
                <p><strong>Data de Abertura:</strong> {formatarData(formData.dataAberturaEmpresa)}</p>
                <p><strong>Responsável:</strong> {formData.responsavel || "Não informado"}</p>
                <p><strong>CPF do Responsável:</strong> {formData.cpfResponsavel || "Não informado"}</p>
                <p><strong>Data de Nascimento do Responsável:</strong> {formatarData(formData.dataNascimentoResponsavel)}</p>
              </>
            )}
          </div>
        )}
      </div>



      {/* 🔹 CONTATO */}
      <div className="accordion">
        <div className="accordion-header" onClick={() => toggleSection("contato")}>
          <h3>Contato</h3>
          {expandedSection === "contato" ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {expandedSection === "contato" && (
          <div className="accordion-content">
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Telefone 1:</strong> {formData.telefone1}</p>
            <p><strong>Telefone 2:</strong> {formData.telefone2}</p>
            {formData.telefone3 && <p><strong>Telefone 3:</strong> {formData.telefone3}</p>}
          </div>
        )}
      </div>

      {/* 🔹 ENDEREÇO */}
      <div className="accordion">
        <div className="accordion-header" onClick={() => toggleSection("endereco")}>
          <h3>Endereço</h3>
          {expandedSection === "endereco" ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {expandedSection === "endereco" && (
          <div className="accordion-content">
            <p><strong>Cidade:</strong> {formData.cidade}</p>
            <p><strong>Bairro:</strong> {formData.bairro}</p>
            <p><strong>Endereço:</strong> {formData.bairro}, {formData.numero} - {formData.cep}</p>
            <p><strong>Pto Referencia:</strong> {formData.complemento || "Não informado"}</p>

            {/* 🔥 Adiciona link para Google Maps caso latitude e longitude existam */}
            {formData.latitude && formData.longitude && (
              <p>
                <strong>📍 Localização no Google Maps:</strong><br />
                <a 
                  href={`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: "#007bff", textDecoration: "none", fontWeight: "bold" }}
                >
                  🌍 Ver no Google Maps
                </a>
              </p>
            )}
          </div>
        )}
      </div>

      {/* 🔹 PLANO ESCOLHIDO */}
      <div className="accordion">
        <div className="accordion-header" onClick={() => toggleSection("plano")}>
          <h3>Plano Escolhido</h3>
          {expandedSection === "plano" ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {expandedSection === "plano" && (
          <div className="accordion-content">
            <p><strong>Plano:</strong> {formData.plano}</p>
            <p><strong>Serviço Adicional:</strong> {formData.streaming || "Nenhum"}</p>
            <p><strong>Data de Vencimento:</strong> {formData.vencimento}</p>
            <p><strong>Vendedor:</strong> {formData.vendedor}</p>
          </div>
        )}
      </div>

      {/* BOTÕES */}
      <div className="button-group-mobile">
        <button className="voltar-mobile" onClick={prevStep}>Voltar</button>
        <button 
          className="finalizar-mobile" 
          onClick={handleSubmit} 
          disabled={loading || Object.keys(formData).length === 0}
        >
          {loading ? "Enviando..." : "Finalizar Cadastro"}
        </button>
      </div>

      {mostrarModal && (
          <ModalConfirmacao
            protocolo={protocoloGerado}
            onClose={() => {
              setMostrarModal(false);
              if (typeof setFormData === "function") {
                setFormData({}); // 🔥 Limpa com segurança ao fechar o Modal
              }
            }}
          />
        )}



    </div>
  );
};

export default StepConfirmacaoMobile;
